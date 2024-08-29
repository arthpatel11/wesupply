//----------------- Sidebar Active Class Scroll js code start here -----------------
let activeItem = document.querySelector(".sidebar-list .active");
let sidebarList = document.querySelector(".sidebar-list");

if (activeItem && sidebarList) {
    activeItem.scrollIntoView({
        // behavior: 'smooth',
        block: 'center'
    });
}
//----------------- Sidebar Active Class Scroll js code end here -----------------

//----------------- Sidebar Toggle js code start here -----------------
$(document).ready(function() {
    var $crmSidebar = $(".sidebar-row");
    var $body = $("body");

    $(".sidebar-open-btn, .sidebar-close-btn").click(function() {
        $crmSidebar.toggleClass("sidebar-open");
        $body.toggleClass("sidebar-bg");
    });
});
//----------------- Sidebar Toggle js code end here -----------------

//----------------- Bootstrap Dropdown js code start here -----------------
$(document).ready(function() {
    $('.dropdown').on('show.bs.dropdown', function(e) {
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown(300);
    });
    $('.dropdown').on('hide.bs.dropdown', function(e) {
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp(150);
    });
});
//----------------- Bootstrap Dropdown js code end here -----------------

//----------------- Form Select js code start here -----------------
document.querySelectorAll('.comn-form-select').forEach((el) => {
    let settings = {
        hidePlaceholder: true,
    };
    if (el.hasAttribute('multiple')) {
        settings.plugins = ['remove_button'];
    }
    if (el.hasAttribute('outside')) {
        settings.dropdownParent = 'body';
        settings.onDropdownOpen = function(dropdown) {
            dropdown.classList.add('dropdown-outside');
        };
    }
    new TomSelect(el, settings);
});


//----------------- Form Select js code end here -----------------



//----------------- Datepicker js code start here -----------------
$(document).ready(function() {
    $(".comn-datepicker, .comn-datetimepicker, .comn-range-datepicker, .comn-multiple-datepicker, .comn-monthpicker").each(function() {
        var $container = $(this).closest('.datepicker-container');
        var enableTime = $(this).hasClass('comn-datetimepicker');
        var rangePicker = $(this).hasClass('comn-range-datepicker');
        var multiplePicker = $(this).hasClass('comn-multiple-datepicker');
        var monthpicker = $(this).hasClass('comn-monthpicker');

        var mode = "single";
        if (rangePicker) {
            mode = "range";
        } else if (multiplePicker) {
            mode = "multiple";
        }

        var plugins = [];
        if (monthpicker) {
            plugins.push(new monthSelectPlugin({
                dateFormat: "F Y",
            }));
        }

        $(this).flatpickr({
            appendTo: $container[0],
            enableTime: enableTime,
            dateFormat: enableTime ? "d/m/Y h:iK" : "d/m/Y",
            time_24hr: false,
            shorthandCurrentMonth: true,
            locale: {
                firstDayOfWeek: 1,
                rangeSeparator: " - "

            },
            disableMobile: true,
            prevArrow: '<i class="fa-solid fa-chevron-left"></i>',
            nextArrow: '<i class="fa-solid fa-chevron-right"></i>',
            mode: mode,
            conjunction: "   |   ",
            plugins: plugins
        });
    });
});


//----------------- Datepicker js code end here -----------------



//----------------- Datatable js code start here -----------------
const datatablePagination = {
    first: '<i class="fa-solid fa-angles-left"></i>',
    previous: '<i class="fa-solid fa-chevron-left"></i>',
    next: '<i class="fa-solid fa-chevron-right"></i>',
    last: '<i class="fa-solid fa-angles-right"></i>',
};
const datatableNoRecord = '<div class="comn-no-record-box"><img src="../assets/images/no-record-image.svg">No results found</div>';
//----------------- Datatable js code end here -----------------




//----------------- Image Dropzone js code start here -----------------
function initializeDropzone(dropzoneId, previewImageId, uploadedImageId, dropzoneBtnId, multipleImage) {
    var myDropzoneElement = document.getElementById(dropzoneId);

    if (myDropzoneElement) {
        var myDropzone = new Dropzone(myDropzoneElement, {
            url: "website URL",
            paramName: "file",
            maxFilesize: 2,
            acceptedFiles: ".jpg, .jpeg, .png, .svg",
            maxFiles: multipleImage ? 2 : 1,
            clickable: "#" + dropzoneId + ", #" + dropzoneBtnId,
            dictDefaultMessage: "<span><i class='fa-solid fa-plus'></i> Drag a file here or browse a file to upload</span>",
            init: function() {
                if (!multipleImage) {
                    this.on("addedfile", function(file) {
                        if (this.files.length > 1) {
                            this.removeFile(this.files[0]);
                        }
                    });
                }

                var _this = this;
                var isFirstImageUploaded = false;
                var numUploadedImages = 0;

                function updateHiddenInput(dataURL) {
                    var hiddenInput = document.getElementById(uploadedImageId);
                    hiddenInput.value = dataURL;
                }

                function updatePreviewImage() {
                    var previewImage = document.getElementById(previewImageId);
                    if (_this.files && _this.files.length > 0) {
                        if (_this.files[0].dataURL) {
                            previewImage.src = _this.files[0].dataURL;
                        } else {
                            previewImage.src = URL.createObjectURL(_this.files[0]);
                        }
                    } else {
                        previewImage.src = '../assets/images/no-image.png';
                        updateHiddenInput('');
                    }
                }

                this.on("addedfile", function(file) {
                    var removeButton = Dropzone.createElement("<a class='dz-remove' href='javascript:;'><i class='fa-solid fa-xmark'></i></a>");
                    removeButton.addEventListener("click", function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        _this.removeFile(file);
                        numUploadedImages--;
                        updatePreviewImage();
                    });
                    file.previewElement.appendChild(removeButton);
                    numUploadedImages++;
                    updatePreviewImage();
                });

                this.on("success", function(file, response) {
                    if (!isFirstImageUploaded) {
                        isFirstImageUploaded = true;
                        updatePreviewImage();
                    }
                });
            }
        });
    }
}

initializeDropzone("image-drop-card-1", "previewImage-1", "uploadedImage-1", "dropzone-btn-1", false);
initializeDropzone("image-drop-card-2", "previewImage-2", "uploadedImage-2", "dropzone-btn-2", false);
initializeDropzone("image-drop-card-3", "previewImage-3", "uploadedImage-3", "dropzone-btn-3", false);
initializeDropzone("image-drop-card-4", "previewImage-4", "uploadedImage-4", "dropzone-btn-4", true);
initializeDropzone("image-drop-card-5", "previewImage-5", "uploadedImage-5", "dropzone-btn-5", true);
initializeDropzone("image-drop-card-categoryImage", "previewImage-categoryImage", "uploadedImage-categoryImage", "dropzone-btn-categoryImage", false);
//----------------- Image Dropzone js code end here -----------------




//----------------- Generate Manually Barcode js code start here -----------------
$(document).ready(function() {
    function toggleBarcodeInputMethod() {
        if ($('#applyGenerate').is(':checked')) {
            $('.auto-generate-row').show();
            $('.add-manually-row').hide();
        } else if ($('#addManually').is(':checked')) {
            $('.auto-generate-row').hide();
            $('.add-manually-row').show();
        }
    }

    toggleBarcodeInputMethod();
    $('input[name="addbarcodesku"]').change(function() {
        toggleBarcodeInputMethod();
    });
});
//----------------- Generate Manually Barcode js code end here -----------------




//----------------- Modal Barcode Image Dropzone js code start here -----------------
Dropzone.autoDiscover = false;

$(".barcode-modal-dropzone").each(function() {
    var numUploadedImages = 0;
    var $this = $(this);

    var myDropzone = new Dropzone($this[0], {
        url: "website URL",
        paramName: "file",
        maxFilesize: 2,
        maxFiles: 1,
        acceptedFiles: "image/*",
        dictDefaultMessage: "<span><i class='fa-solid fa-plus'></i> Drag a file here or browse a file to upload</span>",
        init: function() {
            var _this = this;

            this.on("addedfile", function(file) {
                if (this.files.length > 1) {
                    this.removeFile(this.files[0]);
                }

                var previewElement = file.previewElement;
                if (!previewElement) {
                    return;
                }
                var removeButton = Dropzone.createElement("<a class='dz-remove' href='javascript:;'><i class='fa-solid fa-xmark'></i></a>");

                removeButton.addEventListener("click", function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    _this.removeFile(file);
                    numUploadedImages--;
                });

                previewElement.appendChild(removeButton);

                numUploadedImages++;
            });

            this.on("thumbnail", function(file, dataUrl) {
                if (file.previewElement) {
                    file.previewElement.classList.remove("dz-file-preview");
                    var images = file.previewElement.querySelectorAll("[data-dz-thumbnail]");
                    for (var i = 0; i < images.length; i++) {
                        images[i].alt = file.name;
                        images[i].src = dataUrl;
                    }
                }
            });
        }
    });
});
//----------------- Modal Barcode Image Dropzone js code end here -----------------




//----------------- Tagify js code start here -----------------
document.addEventListener("DOMContentLoaded", function() {
    var inputs = document.querySelectorAll('.comn-tagify');
    inputs.forEach(function(input) {
        var tagify = new Tagify(input, {
            delimiters: ",| ",
            editTags: false,
        });

        var addButton = input.parentElement.querySelector('.tagify-add-btn');
        if (addButton) {
            addButton.addEventListener('click', function() {
                var tagValue = [{ value: "" }];
                tagify.addTags(tagValue);
            });
        }
    });
});
//----------------- Tagify js code end here -----------------





//----------------- Order Quantity js code start here -----------------
document.querySelectorAll('.order-count-box').forEach(box => {
    const minusButton = box.querySelector('.order-minus');
    const plusButton = box.querySelector('.order-plus');
    const input = box.querySelector('.order-count-input');

    minusButton.addEventListener('click', () => {
        let value = parseInt(input.value, 10);
        if (value > 1) {
            value--;
            input.value = value;
        }
    });

    plusButton.addEventListener('click', () => {
        let value = parseInt(input.value, 10);
        value++;
        input.value = value;
    });

    input.addEventListener('input', () => {
        let value = input.value.replace(/[^0-9]/g, '');
        input.value = value ? parseInt(value, 10) : 1;
    });

    input.addEventListener('blur', () => {
        let value = parseInt(input.value, 10);
        if (isNaN(value) || value < 1) {
            input.value = 1;
        }
    });
});
//----------------- Order Quantity js code end here -----------------



//----------------- Show Hide Password js code start here -----------------
$(".show-hide-password-btn").click(function() {
    var input = $(this).siblings("input");
    var eyeSlashIcon = $(this).find(".fa-eye-slash");
    var eyeIcon = $(this).find(".fa-eye");

    if (input.attr("type") === "password") {
        input.attr("type", "text");
        eyeSlashIcon.hide();
        eyeIcon.show();
    } else {
        input.attr("type", "password");
        eyeSlashIcon.show();
        eyeIcon.hide();
    }
});
//----------------- Show Hide Password js code end here -----------------


//----------------- Ck Editor js code start here -----------------
document.addEventListener("DOMContentLoaded", function() {
    var editors = document.querySelectorAll('.comn-editor');
    editors.forEach(function(editor) {
        ClassicEditor
            .create(editor)
            .catch(error => {
                console.error(error);
            });
    });
});
//----------------- Ck Editor js code end here -----------------