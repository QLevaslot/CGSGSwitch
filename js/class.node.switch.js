/**
 * Created with IntelliJ IDEA.
 * User: qlevaslo
 * Date: 21/01/14
 * Time: 16:21
 */


cgsgEventTypes.ON_SWITCH_VALUE_CHANGED = "onSwitchValueChanged";

/**
 * This class represents an Accordion.
 * @class CGSGAccordion
 * @module Node
 * @extends CGSGNode
 * @constructor
 * @param {Number} x Relative position on X
 * @param {Number} y Relative position on Y
 * @param {Number} width Relative dimension
 * @param {Number} height Relative Dimension
 * @param {Number} handleWidth Relative Dimension
 * @param {Number} handleHeight Relative Dimension
 * @type {CGSGNodeSwitch}
 */
var CGSGNodeSwitch = CGSGNode.extend({

    initialize: function (x, y, width, height, handleWidth, handleHeight) {

        this._super(x, y);

        this.classType = "CGSGNodeSwitch";

        this.padding = 10;
        this.resizeTo(width, height);
        this.backgroundColor = "#f1f1f1";
        this.value = false;

        this.handleWidth = handleWidth;
        this.handleHeight = handleHeight;

        this.xHandlePadding = 0;
        this.yHandlePadding = (height - handleHeight)/2;
        if(this.yHandlePadding > 0){
            this.xHandlePadding = this.yHandlePadding;
        }

        this.setHandle();
        this.onClick = this.slide;

        /**
         * Event
         * @property ON_SWITCH_VALUE_CHANGED
         * @default false
         * @type {Function}
         */
        this.onSwitchValueChanged = null;
    },

    //onSwitchValueChanged: function (){
        //do nothing
   // },
    /**
     * slide the switchHandle, on the x axis,
     * direction determined by parent, CGSGNodeSwitch.value
     *
     * @method slide
     * @protected
     */
    slide: function () {
        var minTranslation = this.xHandlePadding,
            maxTranslation = this.getWidth() - this.handle.getWidth() - this.xHandlePadding,
            startMove = 0, endMove = 0;

        // Move handle from current position one end of the switch pane or another, depending on switch value
        var x = this.handle.position.x;
        if (this.value === false){
            startMove = x;
            endMove = maxTranslation;
            this.value = true;
        } else {
            startMove = x;
            endMove = minTranslation;
            this.value = false;
        }
        var timeline = CGSG.animationManager.animate(this.handle, "position.x", 10, startMove, endMove, 0);

        var that = this;
        timeline.onAnimationEnd = function (event) {
            if ( cgsgExist(that.onSwitchValueChanged)) {
                CGSG.eventManager.dispatch(that, cgsgEventTypes.ON_SWITCH_VALUE_CHANGED, new CGSGEvent(that, null));
            }
        };
    },



    /**
     * Set default or custom handle for this slider
     *
     * @method setHandle
     * @public
     * @param {CGSGNode} [handle] slider's handle
     */
    setHandle: function (handle) {
        this.removeAll();
        this.handle = handle;
        if (!cgsgExist(this.handle)) {
            this.handle = new CGSGNodeSwitchHandle(this.xHandlePadding, this.yHandlePadding, this.handleWidth, this.handleHeight);
        }
        this.addChild(this.handle);
    },

    /**
     * Set value of this slider and recompute handle position
     *
     * @method setValue
     * @public
     * @param {Boolean} value of this slider
     */
    setValue: function (value) {
        if(value !== this.value){
            this.slide;
        }
    },

    render: function (ctx) {
        ctx.save();
        ctx.fillStyle = this.backgroundColor;
        ctx.fillRect(0, 0, this.getWidth(), this.getHeight());
        ctx.restore();
    }

});