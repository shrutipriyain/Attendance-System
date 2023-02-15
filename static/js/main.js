/** Select all required elements from webcam.html file */
console.log("js loaded")
const player = document.querySelector('#player');
const capture = document.querySelector('#capture');
const canvas = document.querySelector('#canvas');
const register = document.querySelector('#register');
const context = canvas.getContext('2d');
const submitForm = document.querySelector('form');

/**  Attach the video stream to the video element and autoplay.*/
const constraints = {
    video: true,
};
navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
    player.srcObject = stream;

});

/** capture button functionality*/
capture.addEventListener('click', () => {
    context.drawImage(player, 0, 0, canvas.width, canvas.height);
});

/** register button functionality */
submitForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let form = e.currentTarget;
    //1. convert image to base64
    let Data = canvas.toDataURL();
    Data = Data.slice(22);
    // Data = '/' + Data; 
    //send to the server
    // let data = JSON.stringify({ image: Data });
    console.log("Data", Data);
    // console.log("data", data);


    let formData = new FormData();
    formData.append("image", Data);
    const options = 
    {
      method: "POST",
      body: formData,
      mode: 'no-cors'
    }
    fetch('http://127.0.0.1:5500/register', options)
    .then((response) => {})
});

/**
 * Helper function to POST data as JSON with Fetch.
 */
async function postFormFieldsAsJson({ url, formData }) {
    //Create an object from the form data entries
    let formDataObject = Object.fromEntries(formData.entries());
    // Format the plain form data as JSON
    let formDataJsonString = JSON.stringify(formDataObject);

    //Set the fetch options (headers, body)
    let fetchOptions = {
        //HTTP method set to POST.
        method: "POST",
        //Set the headers that specify you're sending a JSON body request and accepting JSON response
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        // POST request body as JSON string.
        body: formDataJsonString,
    };

    //Get the response body as JSON.
    //If the response was not OK, throw an error.
    let res = await fetch(url, fetchOptions);

    //If the response is not ok throw an error (for debugging)
    if (!res.ok) {
        let error = await res.text();
        throw new Error(error);
    }
    //If the response was OK, return the response body.
    return res.json();
}


// register.addEventListener('click', () => {
//     const video = document.querySelector('#player');
//     const name = document.querySelector('input').value;
//     // capture image and draw it to canvas
//     context.drawImage(video, 0, 0, canvas.width, canvas.height);

//     //add the register button
//     document.querySelector("input").style.display = "block";

//     // convert it to base64
//     data = canvas.toDataURL(imagetype);

 // httpPost.onreadystatechange = function (err) {
    //     if (httpPost.readyState == 4 && httpPost.status == 200) {
    //         console.log(httpPost.responseText);
    //     } else {
    //         console.log(err);
    //     }
    // };
    // // Set the content type of the request to json since that's what's being sent
    // httpPost.setHeader('Content-Type', 'application/json');
    // httpPost.open("POST", path, true);
    // httpPost.send(data);



// headers: {
//             // 'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },