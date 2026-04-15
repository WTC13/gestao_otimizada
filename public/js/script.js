var myModalEl = document.getElementById('modalOrcamento')
myModalEl.addEventListener('hidden.bs.modal', function (event) {
  document.getElementById('formNovoOrcamento').reset();
})

document.addEventListener('click', function (event) {
    if (event.target.closest('[data-bs-toggle="modal"]')) {
        const button = event.target.closest('[data-bs-toggle="modal"]');
        const targetSelector = button.getAttribute('data-bs-target');
        const modalElement = document.querySelector(targetSelector);
        
        if (modalElement) {
            const modalInstance = bootstrap.Modal.getOrCreateInstance(modalElement);
            modalInstance.show();
        }
    }
});