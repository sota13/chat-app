// function to limit the texet length
export const limitText = (text, length) => {
    if(text.length >= length) { 
        let limitedText = text.substring(0, length) + "..."
        return limitedText
    }
    return text
}


// function to convert a string to boolean
export const stringToBoolean = (value) => {
    if (value && typeof value === "string") {
         if (value.toLowerCase() === "true") return true;
         if (value.toLowerCase() === "false") return false;
    }
    return value;
 }

// function to load video and then can know the meta data of it like a duration
 export const loadVideo = file => new Promise((resolve, reject) => {
    try {
        let video = document.createElement('video')
        video.preload = 'metadata'

        video.onloadedmetadata = function () {
            resolve(this)
        }

        video.onerror = function () {
            reject("Invalid video. Please select a video file.")
        }

        video.src = window.URL.createObjectURL(file)
    } catch (e) {
        reject(e)
    }
})


// function to convet time in second to formated duration
export function formattedDuration(time) {
    let h=0;
    let m=0;
    let s=0;

    if (time > 3599) {
         h = time / 3600
         let reminder = time % 3600
         if (reminder > 59) {
            m = reminder / 60
            s = reminder % 60
         } else {
            m = reminder
         }
         return `${Math.floor(h)}h ${Math.floor(m)}m`

    } else if (time > 59) {
        m = time / 60
        s = time % 60
        return `${Math.floor(m)}m ${Math.floor(s)}s`
    } else {
        s = time
        return `${Math.floor(s)}s`
    }
}


// format time stamp
export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString();
  }