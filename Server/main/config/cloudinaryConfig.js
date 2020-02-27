const cloudinary = require('cloudinary');
cloudinary.config({
cloud_name: 'doanqz7r8',
api_key: '618513172984447',
api_secret: "-V1kTFVbnE-EtD82e7UMf7-Ah6I"
});

exports.uploads = (file) =>{
  return new Promise(resolve => {
  cloudinary.uploader.upload(file, (result) =>{
  resolve({url: result.url, id: result.public_id})
  }, {resource_type: "auto"})
  })
}