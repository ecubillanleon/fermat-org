/**
 * @class Represents the group of all header icons
 * @param {Number} columnWidth         The number of elements that contains a column
 * @param {Number} superLayerMaxHeight Max rows a superLayer can hold
 * @param {Number} groupsQtty          Number of groups (column headers)
 * @param {Number} layersQtty          Number of layers (rows)
 * @param {Array}  superLayerPosition  Array of the position of every superlayer
 */
function Headers(columnWidth, superLayerMaxHeight, groupsQtty, layersQtty, superLayerPosition) {
        
    // Private members
    var objects = [],
        dependencies = {
            root : []
        },
        positions = {
            table : [],
            stack : []
        },
        self = this,
        graph = {},
        lines = [];


        this.dep = dependencies;
        this.obj = objects;
        this.pos = positions;
    
    // Public method

    /**
     * @author Emmanuel Colina
     * Paint the vectors (dependences)
     */

    this.paintDependencestack = function(startX,startY,endX,endY) {
       
        camera.resetPosition();

        var material = new THREE.LineBasicMaterial({transparent : true, opacity : 0, color: 0XF26662});

        var geometry = new THREE.Geometry();
        geometry.vertices.push(
            
            new THREE.Vector3( startX,startY,0 ),
            new THREE.Vector3( endX,endY,0 )
        );

        var line = new THREE.Line( geometry, material );
        line.position.x = -1600;
        line.position.z = 44700;

        scene.add( line );
        
        lines.push(line);

        helper.showMaterial(line.material, 3000, TWEEN.Easing.Exponential.InOut, 3000);
    };

    /**
     * @author Miguel Celedon
     * @lastmodified By Emmanuel Colina
     * Arranges the headers by dependency
     * @param {Number} [duration=2000] Duration in milliseconds for the animation
     */
    this.transformStack = function(duration) {
        var _duration = duration || 2000;

        //tileManager.letAlone();
        //camera.resetPosition(_duration / 2);
        drawVectornodo();
        
        var i, l;

        for (i = 0, l = objects.length; i < l; i++) {
            new TWEEN.Tween(objects[i].position)
            .to({
                x : positions.stack[i].position.x,
                y : positions.stack[i].position.y,
                z : positions.stack[i].position.z
            }, _duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .onUpdate(render)
            .start();
        }      
    };

    /**
     * @author Emmanuel Colina
     * Calculates the stack target position
     */
    var calculateStackPositions = function() {
        
        var i, j, k, p, q, m, l, n, obj, actualpositionY, rootpositionY, rootlengthX, midpositionX, actuallengthX, positionstart;
        var POSITION_Z = 45000;

        // Dummy, send all to center
        for(i = 0; i < objects.length; i++) {
            obj = new THREE.Object3D();
            obj.name = positions.table[i].name;
            positions.stack.push(obj);
        }

        for (j = 0; j< objects.length; j++) {
            
            //calculando Y
            if(graph.data.nodes[j].level === 0){

               for(i = 0; i < objects.length; i++){

                    if(graph.data.nodes[j].id == objects[i].name){ //Coordenadas de inicio level = 0
                        positions.stack[i].position.x = 0;
                        positions.stack[i].position.y = -15000;
                        positions.stack[i].position.z = POSITION_Z;
                        break;
                    }        
               }
               rootpositionY = positions.stack[i].position.y;
               rootlengthX = dependencies[graph.data.nodes[j].id].length;
                //obj.position.set(0, -14000, 45000); //coordenadas de entradas del root(OSA)
            }
            else if(graph.data.nodes[j].level !== 0){ //coordenadas level distinto de 0

                for(i = 0; i < objects.length; i++){
                    if(graph.data.nodes[j].id == objects[i].name){
                        positions.stack[i].position.z = POSITION_Z;

                        //calculando Y
                        actualpositionY = rootpositionY;
                        for(k = 0; k < graph.data.nodes[j].level; k++){

                            positions.stack[i].position.y = actualpositionY + 5000;
                            actualpositionY = positions.stack[i].position.y;
                        }

                        //Calculando X
                        if(positions.stack[i].position.x === 0){// Verifica si hay alguna X con valores     if1
                            actuallengthX = rootlengthX;
                            positionstart = 0;
                            if(actuallengthX % 2 !== 0){ //Cantidad de Hijos impar
                                midpositionX = (rootlengthX / 2)+0.5;
                                if(graph.data.nodes[j].level == 6){
                                    for(p = 0; p < objects.length; p++){
                                        if(graph.data.nodes[j].id == objects[p].name){
                                            for(q = 0; q < objects.length; q++){
                                               if(graph.data.nodes[j-1].id == objects[q].name){
                                                    positions.stack[p].position.x = positions.stack[q].position.x;//Heredamos la X del padre para construir de ahi una nueva rama y evitar el cruces de ramas
                                               }
                                            }
                                        }
                                    }
                                }
                                if(actuallengthX == 1 && graph.data.nodes[j].level != 6){// un hijo
                                    for(m = 0; m < objects.length; m++){
                                        if(graph.data.nodes[j].id == objects[m].name){
                                            positions.stack[m].position.x = 0;
                                            rootlengthX = dependencies[graph.data.nodes[j].id].length;
                                        }
                                    }
                                }
                                else{// Varios hijos
                                    for(p = midpositionX; p > 1; p--){
                                        positionstart = positionstart - 5000;
                                    }
                                    for(l = 0; l < dependencies[graph.data.nodes[j-1].id].length; l++){//l es el indice de arreglos de hijos
                                        for(n = 0; n < objects.length; n++){
                                            if(dependencies[graph.data.nodes[j-1].id][l] == objects[n].name){
                                                positions.stack[n].position.x = positions.stack[n].position.x + positionstart;
                                                positionstart = positionstart + 5000;
                                                rootlengthX = dependencies[graph.data.nodes[j].id].length;
                                            }
                                        }
                                    }
                                }
                            }
                            else if(actuallengthX % 2 === 0){ //Cantidad de hijos par
                                midpositionX = actuallengthX/2;
                                for(p = midpositionX; p >= 1; p--){
                                    positionstart = positionstart - 5000;
                                }
                                for(l = 0; l < dependencies[graph.data.nodes[j-1].id].length; l++){
                                    for(n = 0; n < objects.length; n++){
                                        if(dependencies[graph.data.nodes[j-1].id][l] == objects[n].name){
                                            if(positionstart === 0)
                                                positionstart = positionstart + 5000;
                                            if(positionstart !== 0){
                                                positions.stack[n].position.x = positions.stack[n].position.x + positionstart;
                                                for(q = 0; q < objects.length; q++){
                                                   if(graph.data.nodes[j-1].id == objects[q].name){
                                                        positions.stack[n].position.x = positions.stack[n].position.x + positions.stack[q].position.x;//Heredamos la X del padre para construir de ahi una nueva rama y evitar el cruces de ramas
                                                   }
                                                } 
                                                positionstart = positionstart + 5000;
                                                rootlengthX = dependencies[graph.data.nodes[j].id].length;
                                            }
                                        }
                                    }      
                                }
                            }
                        }//if 1
                    }
                }
            }
        }
        
        //Transport all headers to the stack section
        for(i = 0; i < positions.stack.length; i++) {
            positions.stack[i].position.copy(window.viewManager.translateToSection('stack', positions.stack[i].position));
        }
    };

    /**
     * @author Emmanuel Colina
     *             
     * Paint the dependences
     */
    var drawVectornodo = function() { 

        var startX, startY, endX, endY;
        
        var i, j, k;

        new TWEEN.Tween(this)
        .to({}, 12000)
        .onUpdate(render)
        .start();

        for (i = 0; i < graph.data.edges.length; i++)
        {   
            startX = 0;
            startY = 0;
            endX = 0;
            endY = 0;

            //Start
            for (j = 0; j < objects.length; j++){
                 if(graph.data.edges[i].from == objects[j].name){
                    startX = positions.stack[j].position.x;
                    startY = positions.stack[j].position.y;
                }
            }       

            //End
            for (k = 0; k < objects.length; k++){
                if(graph.data.edges[i].to == objects[k].name){
                    endX = positions.stack[k].position.x;
                    endY = positions.stack[k].position.y;  
                }      
            }

            self.paintDependencestack(startX, startY, endX, endY);        
        }
    };

    /**
     * @author Miguel Celedon
     *             
     * Arranges the headers in the table
     * @param {Number} [duration=2000] Duration of the animation
     */
    this.transformTable = function(duration) {
        var _duration = duration || 4000,
            i, l;

        setTimeout(function(){
            for(i = 0; i < lines.length; i++){
                helper.hideObject(lines[i], false, 200);
            }

            lines = [];
        }, 100);


        helper.hide('stackContainer', _duration / 2);
        helper.hide('headContainer', _duration / 2);
        //This should be moved to be called by viewer.js when we no longer use vis for this
        /*setTimeout(function() {    
            tileManager.transform(tileManager.targets.table); 
        }, _duration);*/

        for(i = 0, l = objects.length; i < l; i++) {
            
            new TWEEN.Tween(objects[i].position)
            .to({
                x : positions.table[i].position.x,
                y : positions.table[i].position.y,
                z : positions.table[i].position.z
            }, Math.random() * _duration + _duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();
        }
        
        new TWEEN.Tween(this)
            .to({}, duration * 2)
            .onUpdate(render)
            .start();
        
        self.show(_duration);
    };
    
    /**
     * @author Ricardo Delgado
     * @lastmodifiedBy Miguel Celedon
     *                     
     * Screen shows the head
     * @param {Number} duration Milliseconds of fading
     */
    this.transformHead = function( duration ) {
        var _duration = duration || 1000;
        var i, l;

        tileManager.letAlone();
        camera.resetPosition();
        setTimeout(function() {
            for(i = 0, l = objects.length; i < l; i++) {

                new TWEEN.Tween(objects[i].position)
                .to({
                    z : window.camera.getMaxDistance()
                }, Math.random() * _duration + _duration)
                .easing(TWEEN.Easing.Exponential.InOut)
                .start();
            }

           new TWEEN.Tween(this)
                .to({}, _duration * 2)
                .onUpdate(render)
                .start();

            self.hide(_duration);
            
        }, _duration);
    };
    
    /**
     * Shows the headers as a fade
     * @param {Number} duration Milliseconds of fading
     */
    this.show = function (duration) {
        var i, j;
        
        for (i = 0; i < objects.length; i++ ) {
            for(j = 0; j < objects[i].levels.length; j++) {
                new TWEEN.Tween(objects[i].levels[j].object.material)
                .to({opacity : 1, needsUpdate : true}, duration)
                .easing(TWEEN.Easing.Exponential.InOut)
                .start();
            }
        }
    };
    
    /**
     * Hides the headers (but donesn't delete them)
     * @param {Number} duration Milliseconds to fade
     */
    this.hide = function (duration) {
        var i, j;
        
        for (i = 0; i < objects.length; i++ ) {
            for(j = 0; j < objects[i].levels.length; j++) {
                new TWEEN.Tween(objects[i].levels[j].object.material)
                .to({opacity : 0, needsUpdate : true}, duration)
                .easing(TWEEN.Easing.Exponential.InOut)
                .start();
            }
        }
    };
    
    // Initialization code
    //=========================================================
    
    /**
     * Creates the dependency graph used in vis.js
     * @returns {Object} Object containing the data and options used in vis.js
     */
    var buildGraph = function() {
        
        var i, l, data, edges = [], nodes = [], options,
            level = 0;
            
        var trace = function(root, parent, _level, _nodes, _edges) {
                
                var i, l, child,
                    lookup = function(x) { return x.id == child; };
                
                for(i = 0, l = root.length; i < l; i++) {
                    
                    child = root[i];
                    
                    if(_level !== 0) _edges.push({from : parent, to : child});
                    
                    if($.grep(_nodes, lookup).length === 0)
                    {
                        _nodes.push({
                            id : child,
                            shape : 'image',
                            image : 'images/headers/svg/' + child + '_logo.svg',
                            level : _level
                        });
                    }
                    
                    trace(dependencies[child], child, _level + 1, _nodes, _edges);
                }
            };
        
        trace(dependencies.root, null, level, nodes, edges);
        
        data = {
            edges : edges,
            nodes : nodes
        };
        options = {
            physics:{
                hierarchicalRepulsion: {
                  nodeDistance: 150
                }
              },
            edges:{
                color:{
                    color : '#F26662',
                    highlight : '#E05952',
                    hover: '#E05952'
                }
            },
            layout: {
                hierarchical:{
                    enabled : true,
                    direction: 'DU',
                    levelSeparation: 150,
                    sortMethod : 'directed'
                }
            }
        };
        
        graph = {
            data : data,
            options : options
        };
    };
    

        

    
    var initialize = function() {
        
        var headerData,
            group,
            column,
            image,
            object,
            slayer,
            row;
            
        function createChildren(child, parents) {
                
                var i, l, actual;
                
                if(parents != null && parents.length !== 0) {

                    for(i = 0, l = parents.length; i < l; i++) {

                        dependencies[parents[i]] = dependencies[parents[i]] || [];
                        
                        actual = dependencies[parents[i]];

                        actual.push(child);
                    }
                }
                else {
                    dependencies.root.push(child);
                }
                
                dependencies[child] = dependencies[child] || [];
            }
        
        function createHeader(group, width, height) {
            
            var source,
                levels = [
                    ['high', 0],
                    ['medium', 8000],
                    ['small', 16000]],
                i, l,
                header = new THREE.LOD();
            
            for(i = 0, l = levels.length; i < l; i++) {
            
                source = 'images/headers/' + levels[i][0] + '/' + group + '_logo.png';
                
                var object = new THREE.Mesh(
                    new THREE.PlaneGeometry(width, height),
                    new THREE.MeshBasicMaterial({transparent : true, opacity : 0})
                    );
                
                helper.applyTexture(source, object);
                
                header.addLevel(object, levels[i][1]);
            }
            
            return header;
        }
        
        var src, width, height;
            
        for (group in groups) {
            if (window.groups.hasOwnProperty(group) && group !== 'size') {

                headerData = window.groups[group];
                column = headerData.index;

                width = columnWidth * window.TILE_DIMENSION.width;
                height = width * 443 / 1379;

                object = createHeader(group, width, height);
                
                object.position.set(-160000,
                                    Math.random() * 320000 - 160000,
                                    0);
                object.name = group;

                scene.add(object);
                objects.push(object);

                object = new THREE.Object3D();
                
                object.position.x = (columnWidth * window.TILE_DIMENSION.width) * (column - (groupsQtty - 1) / 2) + ((column - 1) * window.TILE_DIMENSION.width);
                object.position.y = ((layersQtty + 10) * window.TILE_DIMENSION.height) / 2;
                object.name = group;         

                positions.table.push(object);

                createChildren(group, headerData.dependsOn);
            }
        }

        for (slayer in superLayers) {
            if (window.superLayers.hasOwnProperty(slayer) && slayer !== 'size') {

                headerData = window.superLayers[slayer];
                row = superLayerPosition[headerData.index];

                width = columnWidth * window.TILE_DIMENSION.width;
                height = width * 443 / 1379;

                object = createHeader(slayer, width, height);
                
                object.position.set(160000,
                                    Math.random() * 320000 - 160000,
                                    0);
                object.name = slayer;

                scene.add(object);
                objects.push(object);
                
                object = new THREE.Object3D();

                object.position.x = -(((groupsQtty + 1) * columnWidth * window.TILE_DIMENSION.width / 2) + window.TILE_DIMENSION.width);
                object.position.y = -(row * window.TILE_DIMENSION.height) - (superLayerMaxHeight * window.TILE_DIMENSION.height / 2) + (layersQtty * window.TILE_DIMENSION.height / 2);
                object.name = slayer;

                positions.table.push(object);

                createChildren(slayer, headerData.dependsOn);
            }
        }
        
        buildGraph();
        calculateStackPositions();
    };
    
    initialize();
    //=========================================================
}
