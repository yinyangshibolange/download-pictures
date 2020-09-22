const fs = require("fs");
module.exports = (dir) => {
  return new Promise((resolve, reject) => {
    fs.stat(dir, function (err, stats) {
      if (err || !stats.isDirectory()) {
        fs.mkdir(dir, function (err) {
          if (err) {
            reject(err);
            return;
          }
          resolve("创建目录成功");
        });
      }
      resolve("创建失败, 目录已存在");
    });
  });
};
