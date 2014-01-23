/**
 * Created with IntelliJ IDEA.
 * User: qlevaslo
 * Date: 21/01/14
 * Time: 17:27
 * To change this template use File | Settings | File Templates.
 */

var CGSGNodeSwitchHandle = CGSGNode.extend({

    initialize: function (xPadding, yPadding, handleWidth, handleHeight) {
        this._super(xPadding, yPadding);

        this.classType = "CGSGNodeSwitchHandle";

        this.resizeTo(handleWidth, handleHeight);
        this.color = "#cdcdcd";

        this.isClickable = false;
        this.isTraversable = true;

        this.selectionLineColor = 'rgba(0,0,0,0)';
        this.selectionHandleColor = 'rgba(0,0,0,0)';

    },

    /**
     * Default handle rendering (A rounded square with some "volume" effect)
     *
     * @method render
     * @protected
     * @param {CanvasRenderingContext2D} context the context into render the node
     */
    render: function (context) {
        context.save();
        context.fillStyle = this.color;
        context.fillRect(0,0, this.getWidth(), this.getHeight());
        context.restore();

    }
});
