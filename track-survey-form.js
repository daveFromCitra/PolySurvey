function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

const firebaseConfig = {

};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.getElementById("dataForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {};

    formData.forEach((value, key) => {
        if (data[key]) {
            if (!Array.isArray(data[key])) {
                data[key] = [data[key]];
            }
            data[key].push(value);
        } else {
            data[key] = value;
        }
    });


    const name = data.name;


    db.collection("formData").doc(name).set(data)
        .then(function () {
            console.log("Data saved to Database");

            e.target.reset();
        })
        .catch(function (error) {
            console.error("Error adding document: ", error);
        });
});