document.getElementById('theForm').addEventListener("submit", function(event) {
    event.preventDefault();

    const fullname = document.getElementById("entername").value;
    const password = document.getElementById("password").value;
    const comment = document.getElementById("comment").value; 
    const phone = document.getElementById("phone").value;

    if (!fullname || !password || !comment ||!phone) {
        alert("Some required fields are not filled, please fill them.");
        return;

    }

    const commentLength = comment.length;
    console.log(commentLength); 
    if (commentLength < 10){
        alert("Not enough words");
        return;
    }

    const formData = {
        name: fullname,
        password: password,
        comment: comment,
        phone: phone

    };

    console.log(formData);
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "proforms.json", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {

            const response = JSON.parse(xhr.responseText);
            const message = document.getElementById('warning').innerHTML = response.message;
            message.textContent = response.message;
            const form = document.getElementById('theForm');
            form.reset();
        }   else if (xhr.readyState === 4) {
            alert('Problem submitting form, please fix the error');
        }
        
    };
    xhr.send(JSON.stringify(formData));
});