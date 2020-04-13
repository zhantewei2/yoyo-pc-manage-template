"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
const fs = require("fs");
class DocDir {
    constructor(dirpath, outPath, ext, navPrefix = "", routePrefix = "") {
        this.ext = ext;
        this.outPath = outPath;
        this.dirpath = dirpath;
        this.navPrefix = navPrefix;
        this.routePrefix = routePrefix;
        this.candyList = this.readDirToCandyList(dirpath, []);
        this.outRelativePath = path.relative(outPath, dirpath);
    }
    readDirToCandyList(currentPath, collection) {
        const list = fs.readdirSync(currentPath);
        for (let filename of list) {
            const filePath = path.join(currentPath, filename);
            const fileStat = fs.statSync(filePath);
            if (fileStat.isDirectory()) {
                collection.push({
                    filename,
                    filePath,
                    children: this.readDirToCandyList(path.join(currentPath, filename), [])
                });
            }
            else if (filename.endsWith(this.ext)) {
                collection.push({
                    filename,
                    filePath
                });
            }
        }
        return collection;
    }
    toRoutes() {
        const routes = [];
        const listToRoutes = (ls, prefix = "") => {
            if (!ls)
                return;
            ls.forEach(i => {
                if (i.children) {
                    listToRoutes(i.children, path.join(prefix, i.filename));
                }
                else {
                    routes.push({
                        path: this.getRoutePath(i.filename, prefix),
                        pageName: this.getLabelName(i.filename),
                        component: `()=>import('${this.getRouteResolve(i.filename, prefix)}')`
                    });
                }
            });
        };
        listToRoutes(this.candyList, "");
        return routes;
    }
    getRoutePath(filename, prefix) {
        return path.join(this.routePrefix, prefix, this.getLabelName(filename));
    }
    getNavPath(filename, prefix) {
        return path.join(this.navPrefix, prefix, this.getLabelName(filename));
    }
    getRouteResolve(filename, prefix) {
        return path.join(this.outRelativePath, prefix, filename);
    }
    getLabelName(filename) {
        const lastIndex = filename.lastIndexOf(this.ext);
        return lastIndex > 0 ? filename.slice(0, lastIndex) : filename;
    }
    toNavData() {
        const listToNavData = (ls, list, prefix = "") => {
            if (!ls)
                return [];
            for (let i of ls) {
                if (i.children) {
                    list.push({
                        label: this.getLabelName(i.filename),
                        children: listToNavData(i.children, [], i.filename)
                    });
                }
                else {
                    list.push({
                        label: this.getLabelName(i.filename),
                        path: this.getNavPath(i.filename, prefix)
                    });
                }
            }
            return list;
        };
        return listToNavData(this.candyList, [], "");
    }
    toSerialize(obj) {
        let objContent = JSON.stringify(obj, null, 4);
        objContent = objContent.replace(/"component":\s+?"([^"]*)?"/g, (v, group1) => {
            return `"component":${group1}`;
        });
        return `
export default ${objContent};
        `;
    }
}
exports.DocDir = DocDir;
