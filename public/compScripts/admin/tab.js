$('.tab-pane.is-active')
    .addClass('show')
    .show();

$('.nav-pills').on('click', e => {
    $('.nav-link').each(function() {
        $(this).removeClass('is-active');
    });

    const emit = e.target;
    const {dataset} = emit;
    const {target} = dataset;

    emit.classList.add('is-active');

    $('.tab-pane').each(function() {
        const attr = $(this).attr('id');
        const data = target.slice(1);

        $(this).removeClass('show');
        $(this).removeClass('is-active');
        $(this).hide();
        
        if (data == attr) {
            $(this).addClass('show');
            $(this).addClass('is-active');
            $(this).show();
        }
    });
});