const Readable = require('stream');
const readline = require('readline');

module.exports = createTtyWrite;

function createTtyWrite(stream = process.stdout, options = {}) {
  const input = new Readable();
  input.resume = input.pause = () => {};
  const rl = readline.createInterface(
    Object.assign({ prompt: '' }, options, {
      input,
      output: stream
    })
  );

  const write = rl.write;
  rl.write = function(v) {
    let s, key;
    if (typeof v === 'string') {
      s = v;
      key = null;
    } else {
      s = v.sequence;
      key = v;
    }
    return write.call(this, s, key);
  };

  return rl;
}
