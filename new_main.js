let map;



const curvature = 0.5; // how curvy to make the arc

function init() {

    const circle = {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: 'red',
        fillOpacity: .4,
        scale: 4.5,
        strokeColor: 'white',
        strokeWeight: 1
    };

    let mapOptions = {
        center: new google.maps.LatLng(0, 0),
        zoom: 1,
        minZoom: 1
    };

    const Map = google.maps.Map,
        LatLng = google.maps.LatLng,
        Marker = google.maps.Marker,
        Point = google.maps.Point;

    function defaultBounds() {
        let k = 5.0;
        let n = map.allowedBounds.getNorthEast().lat() - k;
        let e = allowedBounds.getNorthEast().lng() - k;
        let s = allowedBounds.getSouthWest().lat() + k;
        let w = allowedBounds.getSouthWest().lng() + k;
        let neNew = new google.maps.LatLng(n, e);
        let swNew = new google.maps.LatLng(s, w);
        boundsNew = new google.maps.LatLngBounds(swNew, neNew);
        map.fitBounds(boundsNew);
    }


    function pinMarker(latLong, text) {
        return new Marker({
            position: latLong,
            map: map,
            draggable: false,
            title: text,
            labelClass: "label",
        })
    }

    function allMarker(latLong, text) {
        return new Marker({
            position: latLong,
            map: map,
            draggable: false,
            title: text,
            labelClass: "label",
            icon: circle
        })
    }

    function createMarker(lat, lon, text, type) {
        let position = new LatLng(lon, lat);
        allMarker(position, text);
        console.log('made marker')
    }

    function loadAllMarkers(inputFile) {

        // for item in inputFile
        // lmit the top airports
        // construct position
        //let pos2 = new LatLng(17.987557, -92.929147);
        // make marker
        const myPattern = /(-?\d+\.\d{0,16}), (-?\d+\.\d{0,16})/g;
        d3.csv(inputFile, function(error, data) {
            data.forEach(function (d) {
                createMarker(d.Lat, d.Lon, d.Iata_code, d.Type)

            });

        });

    }
    loadAllMarkers("large.csv");

    // This is the initial location of the points
    // (you can drag the markers around after the map loads)
    let pos1 = new LatLng(23.634501, -102.552783);
    let pos2 = new LatLng(17.987557, -92.929147);;

    map = new Map(document.getElementById('map-canvas'),
        mapOptions);
    //defaultBounds();


    //let markerP1 = pinMarker(pos1, 'RDW');
    //let markerP2 = pinMarker(pos2, 'DFW');


    // simple arc
    function drawArc(point_1, point_2) {
        // Calculate the arc.
        // To simplify the math, these points
        // are all relative to p1:
        let endPoint = new Point(p2.x - p1.x, p2.y - p1.y), // endpoint (p2 relative to p1)
            midPoint = new Point(endPoint.x / 2, endPoint.y / 2), // midpoint
            orthogonal = new Point(endPoint.y, -endPoint.x), // orthogonal
            curveControlPoint = new Point( // curve control point
                midPoint.x + curvature * orthogonal.x,
                midPoint.y + curvature * orthogonal.y);

        let pathDef = 'M 0,0 ' +
            'q ' + curveControlPoint.x + ',' + curveControlPoint.y + ' ' + endPoint.x + ',' + endPoint.y;

        let zoom = map.getZoom(),
            scale = 1 / (Math.pow(2, -zoom));

        let symbol = {
            path: pathDef,
            scale: scale,
            strokeWeight: 1,
            fillColor: 'none'
        };

        const curveMarker = new Marker({
            position: pos1,
            clickable: false,
            icon: symbol,
            zIndex: 1, // behind the other markers
            map: map
        });

    }



}