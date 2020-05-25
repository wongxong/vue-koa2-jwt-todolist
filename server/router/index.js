const fs = require('fs');
const path = require('path');
const router = require('koa-router')();

fs.readdirSync(path.resolve(__dirname, '../controllers'))
.filter(filename => filename.endsWith('.js'))
.forEach(filename => {
  console.log(`process controller: ${ filename }...`);

  const mapping = require(path.join(__dirname, '../controllers', filename));

  Object.keys(mapping).forEach(k => {
    const [ method, pathname ] = k.split(' ');
    console.log(`[controller] method: ${ method }, pathname: ${ pathname }`);
    router[method.toLowerCase()](pathname, mapping[k]);
  });
});

router.use('/api', router.routes());

module.exports = router;