var divSize = d3.select('#output').node().getBoundingClientRect();

var tries;
var curNoSentences;
var jsonData;


$('#textform').submit(function(event){
	event.preventDefault();
	$('#output > div').remove();
	submitForm();
});

function submitForm(){
	var completeUrl = '/list';

/*	$('#output > div').remove();*/

	$.ajax({
  	url: completeUrl,
	  type: 'GET',
  	dataType: 'json',
    success: function( json ) {
			drawCanvas(json.members);
		},
  	error: function(){
			console.log('error in sending the request');
			$('#output').html('<div style="font-size:20px;">Service is currently down - please try again later</div>');
	  }
	});
}

function drawCanvas(members){
		$('#svgCanvas').remove()
		var svgCanvas = d3.select('#output').append('svg');
		svgCanvas
			.attr('id','svgCanvas')
			.attr('width','100%')
			.attr('height','100%');

		var elementHeight = 100;
		var elementWidth = 200;
		var elementGap = 1.5;
		var scaleFact = elementHeight/100;
		var scaleFactActive = (elementHeight+10)/100;
		
		var absSvgWidth = parseInt( svgCanvas.style( "width" ) );
		var absSvgHeight = parseInt( svgCanvas.style( "height" ) );
		var rowNo = Math.floor( absSvgHeight / ( elementHeight * elementGap ) );
		var colNo = Math.ceil( members.length/rowNo );


		var elementCounter = 0;

		var xPos;
		var yPos;


		for (var col=0; col < colNo; col++){


			xPos = ( elementWidth * elementGap ) * ( col - 0.5 * (colNo-1) ) + absSvgWidth * 0.5 - elementWidth * 0.5;

			if (elementCounter >= members.length){
				break;
			}
			for (var row=0; row < rowNo; row++){
				if (elementCounter >= members.length){
					break;
				}
				yPos =  elementHeight * elementGap  *  (row + 0.5) - elementHeight * 0.5;
				var curBox = svgCanvas.append('g');
				var curTextIp = svgCanvas.append('text');
				var curTextName = svgCanvas.append('text');
				if ( members[elementCounter][2]) {
					curBox
						.attr('transform','translate(' + (xPos-2.5) + ', ' + (yPos-5) +')')	
						.append('path')
							.attr('d','M 9.381159,1.0000001e-7 C 4.184023,1.0000001e-7 0,4.1840047 0,9.3811497 L 0,90.618896 C 0,95.815954 4.184023,100 9.381159,100 l 31.920476,0 c 5.197102,0 9.38115,-4.184046 9.38115,-9.381104 l 0,-81.2377463 C 50.682785,4.1840046 46.498737,0 41.301635,0 L 9.381159,0 Z M 10.035527,11.005815 l 30.610689,0 c 1.88428,0 3.401648,1.516398 3.401648,3.400611 0,1.884302 -1.517368,3.401672 -3.401648,3.401672 l -30.610689,0 c -1.884262,0 -3.400677,-1.51737 -3.400677,-3.401672 0,-1.884213 1.516415,-3.400611 3.400677,-3.400611 z m 0,10.384526 30.610689,0 c 1.88428,0 3.401648,1.516421 3.401648,3.400633 0,1.884258 -1.517368,3.401628 -3.401648,3.401628 l -30.610689,0 c -1.884262,0 -3.400677,-1.51737 -3.400677,-3.401628 0,-1.884212 1.516415,-3.400633 3.400677,-3.400633 z m 0,10.384483 30.610689,0 c 1.88428,0 3.401648,1.517391 3.401648,3.401627 0,1.884214 -1.517368,3.400677 -3.401648,3.400677 l -30.610689,0 c -1.884262,0 -3.400677,-1.516463 -3.400677,-3.400677 0,-1.884236 1.516415,-3.401627 3.400677,-3.401627 z m 30.610689,37.692955 c 1.88428,0 3.401648,1.517347 3.401648,3.401583 l 0,8.609464 c 0,1.884325 -1.517368,3.4007 -3.401648,3.4007 -1.884236,0 -3.400656,-1.516375 -3.400656,-3.4007 l 0,-8.609464 c 0,-1.884236 1.51642,-3.401583 3.400656,-3.401583 z m -9.14091,8.609465 a 3.401193,3.401193 0 0 1 3.401627,3.401582 3.401193,3.401193 0 0 1 -3.401627,3.4007 3.401193,3.401193 0 0 1 -3.400677,-3.4007 3.401193,3.401193 0 0 1 3.400677,-3.401582 z')
							.attr('stroke','none')
							.attr('transform','scale(' +scaleFactActive + ')')	
							.attr('fill','rgba(70,180,70,1.0)');
					curTextName
						.text(members[elementCounter][0])
						.style('font-size', '28px')
						.attr('x', xPos + 70 )
						.attr('y', yPos + 0.5 * elementHeight - 14);
					curTextIp
						.text(members[elementCounter][1])
						.style('font-size', '28px')
						.attr('x', xPos + 70 )
						.attr('y', yPos + 0.5 * elementHeight + 24);
/*					curBox.append('rect')
						.attr('x',xPos-10)
						.attr('y',yPos-10)
						.attr('rx',7)
						.attr('ry',7)
						.attr('width',elementWidth +20)
						.attr('height',elementHeight +20)
						.style('fill','rgba(100,200,100,0.8)');
					curTextName
						.text(members[elementCounter][0])
						.attr('text-anchor','middle')
						.style('font-size', '32px')
						.attr('x', xPos + 0.5 * elementWidth )
						.attr('y', yPos + 0.5 * elementHeight - 15);
					curTextIp
						.text(members[elementCounter][1])
						.attr('text-anchor','middle')
						.style('font-size', '32px')
						.attr('x', xPos + 0.5 * elementWidth )
						.attr('y', yPos + 0.5 * elementHeight + 25);*/
				}else{
/*					curBox
						.attr('x',xPos)
						.attr('y',yPos)
						.attr('rx',7)
						.attr('ry',5)
						.attr('width',elementWidth)
						.attr('height',elementHeight)*/

					curBox
						.attr('transform','translate(' + (xPos) + ', ' + (yPos) +')')	
						.append('path')
							.attr('d','M 9.381159,1.0000001e-7 C 4.184023,1.0000001e-7 0,4.1840047 0,9.3811497 L 0,90.618896 C 0,95.815954 4.184023,100 9.381159,100 l 31.920476,0 c 5.197102,0 9.38115,-4.184046 9.38115,-9.381104 l 0,-81.2377463 C 50.682785,4.1840046 46.498737,0 41.301635,0 L 9.381159,0 Z M 10.035527,11.005815 l 30.610689,0 c 1.88428,0 3.401648,1.516398 3.401648,3.400611 0,1.884302 -1.517368,3.401672 -3.401648,3.401672 l -30.610689,0 c -1.884262,0 -3.400677,-1.51737 -3.400677,-3.401672 0,-1.884213 1.516415,-3.400611 3.400677,-3.400611 z m 0,10.384526 30.610689,0 c 1.88428,0 3.401648,1.516421 3.401648,3.400633 0,1.884258 -1.517368,3.401628 -3.401648,3.401628 l -30.610689,0 c -1.884262,0 -3.400677,-1.51737 -3.400677,-3.401628 0,-1.884212 1.516415,-3.400633 3.400677,-3.400633 z m 0,10.384483 30.610689,0 c 1.88428,0 3.401648,1.517391 3.401648,3.401627 0,1.884214 -1.517368,3.400677 -3.401648,3.400677 l -30.610689,0 c -1.884262,0 -3.400677,-1.516463 -3.400677,-3.400677 0,-1.884236 1.516415,-3.401627 3.400677,-3.401627 z m 30.610689,37.692955 c 1.88428,0 3.401648,1.517347 3.401648,3.401583 l 0,8.609464 c 0,1.884325 -1.517368,3.4007 -3.401648,3.4007 -1.884236,0 -3.400656,-1.516375 -3.400656,-3.4007 l 0,-8.609464 c 0,-1.884236 1.51642,-3.401583 3.400656,-3.401583 z m -9.14091,8.609465 a 3.401193,3.401193 0 0 1 3.401627,3.401582 3.401193,3.401193 0 0 1 -3.401627,3.4007 3.401193,3.401193 0 0 1 -3.400677,-3.4007 3.401193,3.401193 0 0 1 3.400677,-3.401582 z')
							.attr('stroke','none')
							.attr('transform','scale(' +scaleFact + ')')	
							.attr('fill','rgba(130,130,220,1.0)');
					curTextName
						.text(members[elementCounter][0])
						.style('font-size', '24px')
						.attr('x', xPos + 70 )
						.attr('y', yPos + 0.5 * elementHeight - 14);
					curTextIp
						.text(members[elementCounter][1])
						.style('font-size', '24px')
						.attr('x', xPos + 70 )
						.attr('y', yPos + 0.5 * elementHeight + 24);
				}
				elementCounter++;
			}
		}

}

window.addEventListener('resize', function(){
//	if (jsonData != undefined){
//		curNoSentences=0;
//		$('#output > div').remove();
//		drawCanvas();
//	}
});
