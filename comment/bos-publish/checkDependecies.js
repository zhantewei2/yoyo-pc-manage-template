const chalk=require("chalk");

const install=(packageName)=>new Promise((resolve,reject)=>{
    const {spawn}=require("child_process");
    let runComment=`yarn add ${packageName}`;
    runComment=runComment.split(" ");
    const res=spawn(runComment[0],runComment.slice(1));
    res.stdout.on("data",d=>{
        process.stdout.write(d)
    });
    res.stderr.on("data",d=>{
        process.stdout.write(d)
    });
    res.on("exit",code=>{
        resolve()
    })
});

const checkPackage=async(packageName)=>{
  try{
      const check=require(packageName);
  }catch (e) {
      console.log(chalk.yellow('not found '),chalk.red(packageName));
      console.log(chalk.cyan("install "),chalk.red(packageName),chalk.cyan(" for you"));
      await install(packageName);
  }
};


const check=async()=>{
    await checkPackage("crimson-progressbar");
};

module.exports=check;