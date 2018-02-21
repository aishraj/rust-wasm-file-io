const process = async () => {
  const response = await fetch('wasm/experiment.wasm');
  const bytes = await response.arrayBuffer();
  const results = await WebAssembly.instantiate(bytes, {});
  let module = {}
  let mod = results.instance;
  module.do_something = mod.exports.do_something;

  const handleFileUpload = async (evt) => {
    let fileList = evt.target.files;
    let file = fileList[0];
    let fileDataUint8 = await arrayBufferPromiseFromBlob(file);
    let rawData = new Uint8Array(fileDataUint8);
    let moduleReturn = module.do_something(rawData, rawData.length);
    console.log('JS returned', moduleReturn);
  }
  
  const arrayBufferPromiseFromBlob = (fileBlob) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error)
        reader.readAsArrayBuffer(fileBlob);
    });
  };

  document
  .getElementById('browse-for-roms')
  .addEventListener('change', handleFileUpload, false);

}

process();