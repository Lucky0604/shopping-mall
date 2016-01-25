# shopping-mall
shopping mall mobile client

## First step  
TODOS:  
finish the view pages.


## tips:  
1, popup  

	<div class="page">
        <div class="content">
            <div class="content-block">
                <p><a href="#" class="open-about">
                    Open popup
                </a></p>
            </div>
        </div>

        
    </div>

    <div class="popup popup-about">
        <div class="content-block">
            <p><a href="#" class="close-popup">Close</a></p>
        </div>
    </div>

popup须放在page容器外，否则z-index会使popup在遮罩层之下