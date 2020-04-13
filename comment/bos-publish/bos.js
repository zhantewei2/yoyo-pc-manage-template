const {BosClient}=require("@baiducloud/sdk");

const env=process.argv[2];

const config={
    endpoint:"http://su.bcebos.com",
    credentials:{
        ak:"31f52722a1a945f4861f3ce7896bce00",
        sk:"f0673403fbfa4014944b2ed06bcfe0ba"
    }
};
const getBucket=env=>{
    buckets={
        "test":"h-pc-static-prod",
        "prod":"h-pc-static-prod"
    };
    return buckets[env]||'h-pc-static-prod';
};

const bucket=getBucket(env);
const client=new BosClient(config);

exports.bucket=bucket;
exports.client=client;