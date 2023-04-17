// function to validate image
export const validImage = (fileName) => {
    return (/\.(jpe?g|png|gif|bmp|svg)$/i.test(fileName))
}


// function to validate image
export const validVideo = (fileName) => {
    return (/^.*\.(avi|wmv|flv|mpg|mp4)$/i.test(fileName))
}