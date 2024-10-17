function uploadImage() {
    const input = document.getElementById('imageInput');
    const file = input.files[0];
    const resultDiv = document.getElementById('result');
    const preview = document.getElementById('preview');
    const loading = document.querySelector('.loading');

    if (!file) {
        resultDiv.textContent = 'Please select an image first.';
        return;
    }

    const formData = new FormData();
    formData.append('image', file);

    resultDiv.textContent = '';
    loading.style.display = 'block';

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        loading.style.display = 'none';
        if (data.error) {
            resultDiv.textContent = `Error: ${data.error}`;
        } else {
            resultDiv.textContent = `License Plate: ${data.license_plate}`;
        }
    })
    .catch(error => {
        loading.style.display = 'none';
        resultDiv.textContent = `Error: ${error.message}`;
    });

    // Show image preview
    const reader = new FileReader();
    reader.onload = function(e) {
        preview.src = e.target.result;
        preview.style.display = 'block';
    }
    reader.readAsDataURL(file);
}

// Update file input label with selected file name
document.getElementById('imageInput').addEventListener('change', function(e) {
    var fileName = e.target.files[0].name;
    var label = document.querySelector('.custom-file-upload');
    label.textContent = fileName;
});