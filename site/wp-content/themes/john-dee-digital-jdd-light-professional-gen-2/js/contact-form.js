(function () {
    'use strict';

    var form = document.getElementById('jdd-contact-form');
    if (!form) return;

    var successEl = document.getElementById('jdd-success');
    var submitBtn = document.getElementById('jdd-submit');
    var submitOriginalText = submitBtn.textContent;

    function clearErrors() {
        form.querySelectorAll('.jdd-field-error').forEach(function (el) {
            el.style.display = 'none';
            el.textContent = '';
        });
    }

    function showError(fieldId, message) {
        var el = document.getElementById('jdd-error-' + fieldId);
        if (el) {
            el.textContent = message;
            el.style.display = 'block';
        }
    }

    function validateForm(formData) {
        var valid = true;
        if (!formData.name) {
            showError('name', 'Please enter your name.');
            valid = false;
        }
        if (!formData.email) {
            showError('email', 'Please enter your email address.');
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            showError('email', 'Please enter a valid email address.');
            valid = false;
        }
        if (!formData.message) {
            showError('message', 'Please enter a message.');
            valid = false;
        }
        return valid;
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        clearErrors();

        var formData = {
            name: document.getElementById('jdd-name').value.trim(),
            email: document.getElementById('jdd-email').value.trim(),
            organization_type: (form.querySelector('input[name="organization_type"]:checked') || {}).value || '',
            interest: (form.querySelector('input[name="interest"]:checked') || {}).value || '',
            timeline: (form.querySelector('input[name="timeline"]:checked') || {}).value || '',
            message: document.getElementById('jdd-message').value.trim(),
        };

        if (!validateForm(formData)) return;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';

        fetch(jddContact.restUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
            .then(function (response) {
                return response.json().then(function (result) {
                    return { ok: response.ok, result: result };
                });
            })
            .then(function (payload) {
                if (payload.ok && payload.result.success) {
                    form.style.display = 'none';
                    successEl.style.display = 'block';
                } else if (payload.result.code === 'invalid_email') {
                    showError('email', payload.result.message || 'Please enter a valid email address.');
                    submitBtn.disabled = false;
                    submitBtn.textContent = submitOriginalText;
                } else {
                    showError('general', payload.result.message || 'Something went wrong. Please try again.');
                    submitBtn.disabled = false;
                    submitBtn.textContent = submitOriginalText;
                }
            })
            .catch(function () {
                showError('general', 'Unable to send your message. Please check your connection and try again.');
                submitBtn.disabled = false;
                submitBtn.textContent = submitOriginalText;
            });
    });
})();
