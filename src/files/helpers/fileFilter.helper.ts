export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
) => {
	
	if(!file) return callback(new Error('File is required'), false);
	const fileExtesion= file.mimetype.split('/')[1];
	const validExtensions = ['jpg', 'jpeg', 'png'];
	if(validExtensions.includes(fileExtesion)){
		return callback(null, true);
	}

  callback(null, false);
};
