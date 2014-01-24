var CGMain = CGSGView.extend(
    {
        initialize : function(canvas) {
            this._super(canvas);

            ////// INITIALIZATION /////////
            this.initializeCanvas();
            this.createScene();

            this.startPlaying();
        },

        initializeCanvas : function() {
            //redimensionnement du canvas pour être full viewport en largeur
            this.viewDimension = cgsgGetRealViewportDimension();
            this.setCanvasDimension(this.viewDimension);
        },

        /**
         * create example
         *
         */
        createScene : function() {
            //create a first root node.
            this.rootNode = new CGSGNode(0, 0);
            CGSG.sceneGraph.addNode(this.rootNode, null);

            //Text Log for first switch
            this.textNode = new CGSGNodeText(400, 20, "Value : ?");
            this.textNode.setSize(10);
            this.rootNode.addChild(this.textNode, null);

            //First switch
            this.switch = new CGSGNodeSwitch(15, 15, 200, 50, 50, 30);

            this.rootNode.addChild(this.switch, null);

            var that = this;
            this.switch.onSwitchValueChanged = function (event) {
                console.log(event);
                that.textNode.setText("Value : "+ that.switch.value);
            }

            //Text Log for second switch
            this.textNode2 = new CGSGNodeText(400, 220, "Value : ?");
            this.textNode2.setSize(10);
            this.rootNode.addChild(this.textNode2, null);

            //Second switch
            this.switch2 = new CGSGNodeSwitch(15, 215, 200, 50, 120, 80);
            this.switch2.backgroundColor = "black";
            this.switch2.handle.color = "green";

            this.rootNode.addChild(this.switch2, null);

            this.switch2.onSwitchValueChanged = function (event) {

                console.log(event);
                that.textNode2.setText("Value : "+ that.switch2.value);
            }

        }
    }
);