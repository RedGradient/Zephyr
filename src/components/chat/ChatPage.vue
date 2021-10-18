<script>
    import $ from 'jquery';
    
    const selectTarget = (fromElement, selector) => {
            if (!(fromElement instanceof HTMLElement)) {
                return null;
            }

            return fromElement.querySelector(selector);
        };

        const resizeData = {
            tracking: false,
            startWidth: null,
            startCursorScreenX: null,
            handleWidth: 10,
            resizeTarget: null,
            parentElement: null,
            maxWidth: null,
        };
        
        $(document.body).on('mousedown', '#resize-handle', null, (event) => {
            if (event.button !== 0) {
                return;
            }

            event.preventDefault();
            event.stopPropagation();
            
            const handleElement = event.currentTarget;

            if (!handleElement.parentElement) {
                console.error(new Error("Parent element not found."));
                return;
            }
            
            const targetSelector = handleElement.getAttribute('data-target');
            const targetElement = selectTarget(handleElement.parentElement, targetSelector);

            resizeData.startWidth = $(targetElement).outerWidth();
            resizeData.startCursorScreenX = event.screenX;
            resizeData.resizeTarget = targetElement;
            resizeData.parentElement = handleElement.parentElement;
            resizeData.maxWidth = $(handleElement.parentElement).innerWidth() - resizeData.handleWidth;
            resizeData.tracking = true;

            console.log('tracking started');
        });

        $(window).on('mousemove', (event) => {
            if (resizeData.tracking) {
                const cursorScreenXDelta = event.screenX - resizeData.startCursorScreenX;
                const newWidth = Math.min(resizeData.startWidth + cursorScreenXDelta, resizeData.maxWidth)

                $(resizeData.resizeTarget).outerWidth(newWidth);
            }
        })

        $(window).on('mouseup', (event) => {
            if (resizeData.tracking) {
                resizeData.tracking = false;

                console.log('tracking stopped');
            }
        })

</script>

<template>
    <div class="flex min-h-screen max-w-full">
        <aside id="left" class="bg-green-100">Room list</aside>
        <div id="resize-handle" data-target='aside' class="cursor-resize p-1 flex items-center">|</div>
        <div id="right" class="bg-pink-100">
            <div>Chat Header</div>
            <div>TextArea</div>
        </div>
    </div>
</template>