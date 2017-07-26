/* ======================================================================== 
2 * Extends Bootstrap v3.1.1 
3  
4 * Copyright (c) <2015> PayPal 
5  
6 * All rights reserved. 
7  
8 * Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met: 
9  
10 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer. 
11  
12 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution. 
13  
14 * Neither the name of PayPal or any of its subsidiaries or affiliates nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission. 
15  
16 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
17  
18 * ======================================================================== */ 
19    
20   
21  (function($) {  
22   "use strict";  
23 
 
24   // GENERAL UTILITY FUNCTIONS 
25   // =============================== 
26    
27   var uniqueId = function(prefix) { 
28       return (prefix || 'ui-id') + '-' + Math.floor((Math.random()*1000)+1) 
29   } 
30 
 
31    
32   var removeMultiValAttributes = function (el, attr, val) { 
33    var describedby = (el.attr( attr ) || "").split( /\s+/ ) 
34       , index = $.inArray(val, describedby) 
35    if ( index !== -1 ) { 
36      describedby.splice( index, 1 ) 
37    } 
38    describedby = $.trim( describedby.join( " " ) ) 
39    if (describedby ) { 
40      el.attr( attr, describedby ) 
41    } else { 
42     el.removeAttr( attr ) 
43    } 
44   } 
45 
 
46 // selectors  Courtesy: https://github.com/jquery/jquery-ui/blob/master/ui/focusable.js and tabbable.js 
47 /* 
48 Copyright jQuery Foundation and other contributors, https://jquery.org/ 
49  
50 This software consists of voluntary contributions made by many 
51 individuals. For exact contribution history, see the revision history 
52 available at https://github.com/jquery/jquery-ui 
53  
54 The following license applies to all parts of this software except as 
55 documented below: 
56  
57 ==== 
58  
59 Permission is hereby granted, free of charge, to any person obtaining 
60 a copy of this software and associated documentation files (the 
61 "Software"), to deal in the Software without restriction, including 
62 without limitation the rights to use, copy, modify, merge, publish, 
63 distribute, sublicense, and/or sell copies of the Software, and to 
64 permit persons to whom the Software is furnished to do so, subject to 
65 the following conditions: 
66  
67 The above copyright notice and this permission notice shall be 
68 included in all copies or substantial portions of the Software. 
69  
70 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, 
71 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
72 MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND 
73 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE 
74 LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION 
75 OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION 
76 WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. 
77  
78 ==== 
79  
80 Copyright and related rights for sample code are waived via CC0. Sample 
81 code is defined as all source code contained within the demos directory. 
82  
83 CC0: http://creativecommons.org/publicdomain/zero/1.0/ 
84  
85 ==== 
86 */ 
87 
 
88   var focusable = function ( element, isTabIndexNotNaN ) { 
89     var map, mapName, img, 
90     nodeName = element.nodeName.toLowerCase(); 
91     if ( "area" === nodeName ) { 
92     map = element.parentNode; 
93     mapName = map.name; 
94     if ( !element.href || !mapName || map.nodeName.toLowerCase() !== "map" ) { 
95     return false; 
96     } 
97     img = $( "img[usemap='#" + mapName + "']" )[ 0 ]; 
98     return !!img && visible( img ); 
99     } 
100     return ( /input|select|textarea|button|object/.test( nodeName ) ? 
101     !element.disabled : 
102     "a" === nodeName ? 
103     element.href || isTabIndexNotNaN :isTabIndexNotNaN) && visible( element ); // the element and all of its ancestors must be visible   
104   } 
105   var visible = function ( element ) { 
106     return $.expr.filters.visible( element ) && 
107       !$( element ).parents().addBack().filter(function() { 
108         return $.css( this, "visibility" ) === "hidden"; 
109       }).length; 
110   } 
111 
 
112   $.extend( $.expr[ ":" ], { 
113     data: $.expr.createPseudo ? 
114       $.expr.createPseudo(function( dataName ) { 
115         return function( elem ) { 
116           return !!$.data( elem, dataName ); 
117         }; 
118       }) : 
119       // support: jQuery <1.8 
120       function( elem, i, match ) { 
121         return !!$.data( elem, match[ 3 ] ); 
122       }, 
123 
 
124     focusable: function( element ) { 
125       return focusable( element, !isNaN( $.attr( element, "tabindex" ) ) ); 
126     }, 
127 
 
128     tabbable: function( element ) { 
129       var tabIndex = $.attr( element, "tabindex" ), 
130         isTabIndexNaN = isNaN( tabIndex ); 
131       return ( isTabIndexNaN || tabIndex >= 0 ) && focusable( element, !isTabIndexNaN ); 
132     } 
133   }); 
134 
 
135   // Modal Extension 
136   // =============================== 
137 
 
138   $('.modal-dialog').attr( {'role' : 'document'}) 
139     var modalhide =   $.fn.modal.Constructor.prototype.hide 
140     $.fn.modal.Constructor.prototype.hide = function(){ 
141        modalhide.apply(this, arguments) 
142        $(document).off('keydown.bs.modal') 
143     } 
144 
 
145     var modalfocus =   $.fn.modal.Constructor.prototype.enforceFocus 
146     $.fn.modal.Constructor.prototype.enforceFocus = function(){ 
147       var $content = this.$element.find(".modal-content") 
148       var focEls = $content.find(":tabbable") 
149       , $lastEl = $(focEls[focEls.length-1]) 
150       , $firstEl = $(focEls[0]) 
151       $lastEl.on('keydown.bs.modal', $.proxy(function (ev) { 
152         if(ev.keyCode === 9 && !(ev.shiftKey | ev.ctrlKey | ev.metaKey | ev.altKey)) { // TAB pressed 
153           ev.preventDefault(); 
154           $firstEl.focus(); 
155         } 
156       }, this)) 
157       $firstEl.on('keydown.bs.modal', $.proxy(function (ev) { 
158           if(ev.keyCode === 9 && ev.shiftKey) { // SHIFT-TAB pressed 
159             ev.preventDefault(); 
160             $lastEl.focus(); 
161           } 
162       }, this)) 
163       modalfocus.apply(this, arguments) 
164     } 
165 
 
166   // DROPDOWN Extension 
167   // =============================== 
168 
 
169   var toggle   = '[data-toggle=dropdown]' 
170       , $par 
171       , firstItem 
172       , focusDelay = 200 
173       , menus = $(toggle).parent().find('ul').attr('role','menu') 
174       , lis = menus.find('li').attr('role','presentation') 
175 
 
176     // add menuitem role and tabIndex to dropdown links 
177     lis.find('a').attr({'role':'menuitem', 'tabIndex':'-1'}) 
178     // add aria attributes to dropdown toggle 
179     $(toggle).attr({ 'aria-haspopup':'true', 'aria-expanded': 'false'}) 
180 
 
181     $(toggle).parent() 
182       // Update aria-expanded when open 
183       .on('shown.bs.dropdown',function(e){ 
184         $par = $(this) 
185         var $toggle = $par.find(toggle) 
186         $toggle.attr('aria-expanded','true') 
187         $toggle.on('keydown.bs.dropdown', $.proxy(function (ev) { 
188           setTimeout(function() { 
189             firstItem = $('.dropdown-menu [role=menuitem]:visible', $par)[0] 
190             try{ firstItem.focus()} catch(ex) {} 
191           }, focusDelay) 
192         }, this)) 
193 
 
194       }) 
195       // Update aria-expanded when closed 
196       .on('hidden.bs.dropdown',function(e){ 
197         $par = $(this) 
198         var $toggle = $par.find(toggle) 
199         $toggle.attr('aria-expanded','false') 
200       }) 
201 
 
202     // Close the dropdown if tabbed away from 
203     $(document) 
204       .on('focusout.dropdown.data-api', '.dropdown-menu', function(e){ 
205         var $this = $(this) 
206           , that = this; 
207         // since we're trying to close when appropriate, 
208         // make sure the dropdown is open 
209         if (!$this.parent().hasClass('open')) { 
210           return; 
211         } 
212         setTimeout(function() { 
213           if(!$.contains(that, document.activeElement)){ 
214             $this.parent().find('[data-toggle=dropdown]').dropdown('toggle') 
215           } 
216         }, 150) 
217        }) 
218       .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu]' , $.fn.dropdown.Constructor.prototype.keydown); 
219 
 
220   // Tab Extension 
221   // =============================== 
222    
223   var $tablist = $('.nav-tabs, .nav-pills') 
224         , $lis = $tablist.children('li') 
225         , $tabs = $tablist.find('[data-toggle="tab"], [data-toggle="pill"]') 
226 
 
227     if($tabs){ 
228       $tablist.attr('role', 'tablist') 
229       $lis.attr('role', 'presentation') 
230       $tabs.attr('role', 'tab') 
231     } 
232 
 
233     $tabs.each(function( index ) { 
234       var tabpanel = $($(this).attr('href')) 
235         , tab = $(this) 
236         , tabid = tab.attr('id') || uniqueId('ui-tab') 
237 
 
238         tab.attr('id', tabid) 
239 
 
240       if(tab.parent().hasClass('active')){ 
241         tab.attr( { 'tabIndex' : '0', 'aria-selected' : 'true', 'aria-controls': tab.attr('href').substr(1) } ) 
242         tabpanel.attr({ 'role' : 'tabpanel', 'tabIndex' : '0', 'aria-hidden' : 'false', 'aria-labelledby':tabid }) 
243       }else{ 
244         tab.attr( { 'tabIndex' : '-1', 'aria-selected' : 'false', 'aria-controls': tab.attr('href').substr(1) } ) 
245         tabpanel.attr( { 'role' : 'tabpanel', 'tabIndex' : '-1', 'aria-hidden' : 'true', 'aria-labelledby':tabid } ) 
246       } 
247     }) 
248 
 
249     $.fn.tab.Constructor.prototype.keydown = function (e) { 
250       var $this = $(this) 
251       , $items 
252       , $ul = $this.closest('ul[role=tablist] ') 
253       , index 
254       , k = e.which || e.keyCode 
255 
 
256       $this = $(this) 
257       if (!/(37|38|39|40)/.test(k)) return 
258 
 
259       $items = $ul.find('[role=tab]:visible') 
260       index = $items.index($items.filter(':focus')) 
261 
 
262       if (k == 38 || k == 37) index--                         // up & left 
263       if (k == 39 || k == 40) index++                        // down & right 
264 
 
265 
 
266       if(index < 0) index = $items.length -1 
267       if(index == $items.length) index = 0 
268 
 
269       var nextTab = $items.eq(index) 
270       if(nextTab.attr('role') ==='tab'){ 
271 
 
272         nextTab.tab('show')      //Comment this line for dynamically loaded tabPabels, to save Ajax requests on arrow key navigation 
273         .focus() 
274       } 
275       // nextTab.focus() 
276 
 
277       e.preventDefault() 
278       e.stopPropagation() 
279     } 
280 
 
281     $(document).on('keydown.tab.data-api','[data-toggle="tab"], [data-toggle="pill"]' , $.fn.tab.Constructor.prototype.keydown) 
282 
 
283    var tabactivate =    $.fn.tab.Constructor.prototype.activate; 
284    $.fn.tab.Constructor.prototype.activate = function (element, container, callback) { 
285       var $active = container.find('> .active') 
286       $active.find('[data-toggle=tab], [data-toggle=pill]').attr({ 'tabIndex' : '-1','aria-selected' : false }) 
287       $active.filter('.tab-pane').attr({ 'aria-hidden' : true,'tabIndex' : '-1' }) 
288 
 
289       tabactivate.apply(this, arguments) 
290 
 
291       element.addClass('active') 
292       element.find('[data-toggle=tab], [data-toggle=pill]').attr({ 'tabIndex' : '0','aria-selected' : true }) 
293       element.filter('.tab-pane').attr({ 'aria-hidden' : false,'tabIndex' : '0' }) 
294    } 
295 
 
296   // Collapse Extension 
297   // =============================== 
298 
 
299      var $colltabs =  $('[data-toggle="collapse"]') 
300       $colltabs.each(function( index ) { 
301         var colltab = $(this) 
302         , collpanel = (colltab.attr('data-target')) ? $(colltab.attr('data-target')) : $(colltab.attr('href')) 
303         , parent  = colltab.attr('data-parent') 
304         , collparent = parent && $(parent) 
305         , collid = colltab.attr('id') || uniqueId('ui-collapse') 
306 
 
307           colltab.attr('id', collid) 
308 
 
309           if(collparent){ 
310             colltab.attr({ 'role':'tab', 'aria-selected':'false', 'aria-expanded':'false' }) 
311             $(collparent).find('div:not(.collapse,.panel-body), h4').attr('role','presentation') 
312             collparent.attr({ 'role' : 'tablist', 'aria-multiselectable' : 'true' }) 
313 
 
314             if(collpanel.hasClass('in')){ 
315               colltab.attr({ 'aria-controls': collpanel.attr('id'), 'aria-selected':'true', 'aria-expanded':'true', 'tabindex':'0' }) 
316               collpanel.attr({ 'role':'tabpanel', 'tabindex':'0', 'aria-labelledby':collid, 'aria-hidden':'false' }) 
317             }else{ 
318               colltab.attr({'aria-controls' : collpanel.attr('id'), 'tabindex':'-1' }) 
319               collpanel.attr({ 'role':'tabpanel', 'tabindex':'-1', 'aria-labelledby':collid, 'aria-hidden':'true' }) 
320             } 
321           } 
322       }) 
323 
 
324     var collToggle = $.fn.collapse.Constructor.prototype.toggle 
325     $.fn.collapse.Constructor.prototype.toggle = function(){ 
326         var prevTab = this.$parent && this.$parent.find('[aria-expanded="true"]') , href 
327 
 
328         if(prevTab){ 
329           var prevPanel = prevTab.attr('data-target') || (href = prevTab.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') 
330           , $prevPanel = $(prevPanel) 
331           , $curPanel = this.$element 
332           , par = this.$parent 
333           , curTab 
334 
 
335         if (this.$parent) curTab = this.$parent.find('[data-toggle=collapse][href="#' + this.$element.attr('id') + '"]') 
336 
 
337         collToggle.apply(this, arguments) 
338 
 
339         if ($.support.transition) { 
340           this.$element.one($.support.transition.end, function(){ 
341 
 
342               prevTab.attr({ 'aria-selected':'false','aria-expanded':'false', 'tabIndex':'-1' }) 
343               $prevPanel.attr({ 'aria-hidden' : 'true','tabIndex' : '-1'}) 
344 
 
345               curTab.attr({ 'aria-selected':'true','aria-expanded':'true', 'tabIndex':'0' }) 
346 
 
347               if($curPanel.hasClass('in')){ 
348                 $curPanel.attr({ 'aria-hidden' : 'false','tabIndex' : '0' }) 
349               }else{ 
350                 curTab.attr({ 'aria-selected':'false','aria-expanded':'false'}) 
351                 $curPanel.attr({ 'aria-hidden' : 'true','tabIndex' : '-1' }) 
352               } 
353           }) 
354         } 
355       }else{ 
356         collToggle.apply(this, arguments) 
357       } 
358     } 
359 
 
360     $.fn.collapse.Constructor.prototype.keydown = function (e) { 
361       var $this = $(this) 
362       , $items 
363       , $tablist = $this.closest('div[role=tablist] ') 
364       , index 
365       , k = e.which || e.keyCode 
366 
 
367       $this = $(this) 
368       if (!/(32|37|38|39|40)/.test(k)) return 
369       if(k==32) $this.click() 
370 
 
371       $items = $tablist.find('[role=tab]') 
372       index = $items.index($items.filter(':focus')) 
373 
 
374       if (k == 38 || k == 37) index--                                        // up & left 
375       if (k == 39 || k == 40) index++                        // down & right 
376       if(index < 0) index = $items.length -1 
377       if(index == $items.length) index = 0 
378 
 
379       $items.eq(index).focus() 
380 
 
381       e.preventDefault() 
382       e.stopPropagation() 
383 
 
384     } 
385 
 
386     $(document).on('keydown.collapse.data-api','[data-toggle="collapse"]' ,  $.fn.collapse.Constructor.prototype.keydown); 
387      
388 
 
389 // Carousel Extension 
390   // =============================== 
391 
 
392       $('.carousel').each(function (index) { 
393 
 
394         // This function positions a highlight box around the tabs in the tablist to use in focus styling 
395 
 
396         function setTablistHighlightBox() { 
397 
 
398           var $tab 
399               , offset 
400               , height 
401               , width 
402               , highlightBox = {} 
403 
 
404             highlightBox.top     = 0 
405           highlightBox.left    = 32000 
406           highlightBox.height  = 0 
407           highlightBox.width   = 0 
408 
 
409           for (var i = 0; i < $tabs.length; i++) { 
410             $tab = $tabs[i] 
411             offset = $($tab).offset() 
412             height = $($tab).height() 
413             width  = $($tab).width() 
414 
 
415 //            console.log(" Top: " + offset.top + " Left: " + offset.left + " Height: " + height + " Width: " + width) 
416 
 
417             if (highlightBox.top < offset.top) { 
418               highlightBox.top    = Math.round(offset.top) 
419             } 
420 
 
421             if (highlightBox.height < height) { 
422               highlightBox.height = Math.round(height) 
423             } 
424 
 
425             if (highlightBox.left > offset.left) { 
426               highlightBox.left = Math.round(offset.left) 
427             } 
428 
 
429             var w = (offset.left - highlightBox.left) + Math.round(width) 
430 
 
431             if (highlightBox.width < w) { 
432               highlightBox.width = w 
433             } 
434 
 
435           } // end for 
436 
 
437 //          console.log("[HIGHLIGHT]  Top: " +  highlightBox.top + " Left: " +  highlightBox.left + " Height: " +  highlightBox.height + " Width: " +  highlightBox.width) 
438 
 
439           $tablistHighlight.style.top    = (highlightBox.top    - 2)  + 'px' 
440           $tablistHighlight.style.left   = (highlightBox.left   - 2)  + 'px' 
441           $tablistHighlight.style.height = (highlightBox.height + 7)  + 'px' 
442           $tablistHighlight.style.width  = (highlightBox.width  + 8)  + 'px' 
443 
 
444         } // end function 
445 
 
446         var $this = $(this) 
447           , $prev        = $this.find('[data-slide="prev"]') 
448           , $next        = $this.find('[data-slide="next"]') 
449           , $tablist    = $this.find('.carousel-indicators') 
450           , $tabs       = $this.find('.carousel-indicators li') 
451           , $tabpanels  = $this.find('.item') 
452           , $tabpanel 
453           , $tablistHighlight 
454           , $pauseCarousel 
455           , $complementaryLandmark 
456           , $tab 
457           , $is_paused = false 
458           , offset 
459           , height 
460           , width 
461           , i 
462           , id_title  = 'id_title' 
463           , id_desc   = 'id_desc' 
464 
 
465 
 
466         $tablist.attr('role', 'tablist') 
467 
 
468         $tabs.focus(function() { 
469           $this.carousel('pause') 
470           $is_paused = true 
471           $pauseCarousel.innerHTML = "Play Carousel" 
472           $(this).parent().addClass('active'); 
473 //          $(this).addClass('focus') 
474           setTablistHighlightBox() 
475           $($tablistHighlight).addClass('focus') 
476           $(this).parents('.carousel').addClass('contrast') 
477         }) 
478 
 
479         $tabs.blur(function(event) { 
480           $(this).parent().removeClass('active'); 
481 //          $(this).removeClass('focus') 
482           $($tablistHighlight).removeClass('focus') 
483           $(this).parents('.carousel').removeClass('contrast') 
484         }) 
485 
 
486 
 
487         for (i = 0; i < $tabpanels.length; i++) { 
488           $tabpanel = $tabpanels[i] 
489           $tabpanel.setAttribute('role', 'tabpanel') 
490           $tabpanel.setAttribute('id', 'tabpanel-' + index + '-' + i) 
491           $tabpanel.setAttribute('aria-labelledby', 'tab-' + index + '-' + i) 
492         } 
493 
 
494         if (typeof $this.attr('role') !== 'string') { 
495           $this.attr('role', 'complementary'); 
496           $this.attr('aria-labelledby', id_title); 
497           $this.attr('aria-describedby', id_desc); 
498           $this.prepend('<p  id="' + id_desc   + '" class="sr-only">A carousel is a rotating set of images, rotation stops on keyboard focus on carousel tab controls or hovering the mouse pointer over images.  Use the tabs or the previous and next buttons to change the displayed slide.</p>') 
499           $this.prepend('<h2 id="' + id_title  + '" class="sr-only">Carousel content with ' + $tabpanels.length + ' slides.</h2>') 
500         } 
501 
 
502 
 
503         for (i = 0; i < $tabs.length; i++) { 
504           $tab = $tabs[i] 
505 
 
506           $tab.setAttribute('role', 'tab') 
507           $tab.setAttribute('id', 'tab-' + index + '-' + i) 
508           $tab.setAttribute('aria-controls', 'tabpanel-' + index + '-' + i) 
509 
 
510           var tpId = '#tabpanel-' + index + '-' + i 
511           var caption = $this.find(tpId).find('h1').text() 
512 
 
513           if ((typeof caption !== 'string') || (caption.length === 0)) caption = $this.find(tpId).text() 
514           if ((typeof caption !== 'string') || (caption.length === 0)) caption = $this.find(tpId).find('h3').text() 
515           if ((typeof caption !== 'string') || (caption.length === 0)) caption = $this.find(tpId).find('h4').text() 
516           if ((typeof caption !== 'string') || (caption.length === 0)) caption = $this.find(tpId).find('h5').text() 
517           if ((typeof caption !== 'string') || (caption.length === 0)) caption = $this.find(tpId).find('h6').text() 
518           if ((typeof caption !== 'string') || (caption.length === 0)) caption = "no title"; 
519 
 
520 //          console.log("CAPTION: " + caption ) 
521 
 
522           var tabName = document.createElement('span') 
523           tabName.setAttribute('class', 'sr-only') 
524           tabName.innerHTML='Slide ' + (i+1) 
525           if (caption) tabName.innerHTML += ": " +  caption 
526           $tab.appendChild(tabName) 
527 
 
528          } 
529 
 
530         // create div for focus styling of tablist 
531         $tablistHighlight = document.createElement('div') 
532         $tablistHighlight.className = 'carousel-tablist-highlight' 
533         document.body.appendChild($tablistHighlight) 
534 
 
535         // create button for screen reader users to stop rotation of carousel 
536 
 
537         // create button for screen reader users to pause carousel for virtual mode review 
538         $complementaryLandmark = document.createElement('aside') 
539         $complementaryLandmark.setAttribute('class', 'carousel-aside-pause') 
540         $complementaryLandmark.setAttribute('aria-label', 'carousel pause/play control') 
541         $this.prepend($complementaryLandmark) 
542 
 
543         $pauseCarousel = document.createElement('button') 
544         $pauseCarousel.className = "carousel-pause-button" 
545         $pauseCarousel.innerHTML = "Pause Carousel" 
546         $pauseCarousel.setAttribute('title', "Pause/Play carousel button can be used by screen reader users to stop carousel animations") 
547         $($complementaryLandmark).append($pauseCarousel) 
548 
 
549         $($pauseCarousel).click(function() { 
550           if ($is_paused) { 
551             $pauseCarousel.innerHTML = "Pause Carousel" 
552             $this.carousel('cycle') 
553             $is_paused = false 
554           } 
555           else { 
556             $pauseCarousel.innerHTML = "Play Carousel" 
557             $this.carousel('pause') 
558             $is_paused = true 
559           } 
560         }) 
561         $($pauseCarousel).focus(function() { 
562           $(this).addClass('focus') 
563         }) 
564 
 
565         $($pauseCarousel).blur(function() { 
566           $(this).removeClass('focus') 
567         }) 
568 
 
569         setTablistHighlightBox() 
570 
 
571         $( window ).resize(function() { 
572           setTablistHighlightBox() 
573         }) 
574 
 
575         // Add space bar behavior to prev and next buttons for SR compatibility 
576         $prev.attr('aria-label', 'Previous Slide') 
577         $prev.keydown(function(e) { 
578           var k = e.which || e.keyCode 
579           if (/(13|32)/.test(k)) { 
580             e.preventDefault() 
581             e.stopPropagation() 
582             $prev.trigger('click'); 
583           } 
584         }); 
585 
 
586         $prev.focus(function() { 
587           $(this).parents('.carousel').addClass('contrast') 
588         }) 
589 
 
590         $prev.blur(function() { 
591           $(this).parents('.carousel').removeClass('contrast') 
592         }) 
593 
 
594         $next.attr('aria-label', 'Next Slide') 
595         $next.keydown(function(e) { 
596           var k = e.which || e.keyCode 
597           if (/(13|32)/.test(k)) { 
598             e.preventDefault() 
599             e.stopPropagation() 
600             $next.trigger('click'); 
601           } 
602         }); 
603 
 
604         $next.focus(function() { 
605           $(this).parents('.carousel').addClass('contrast') 
606         }) 
607 
 
608         $next.blur(function() { 
609           $(this).parents('.carousel').removeClass('contrast') 
610         }) 
611 
 
612         $('.carousel-inner a').focus(function() { 
613           $(this).parents('.carousel').addClass('contrast') 
614         }) 
615 
 
616          $('.carousel-inner a').blur(function() { 
617           $(this).parents('.carousel').removeClass('contrast') 
618         }) 
619 
 
620         $tabs.each(function () { 
621           var item = $(this) 
622           if(item.hasClass('active')) { 
623             item.attr({ 'aria-selected': 'true', 'tabindex' : '0' }) 
624           }else{ 
625             item.attr({ 'aria-selected': 'false', 'tabindex' : '-1' }) 
626           } 
627         }) 
628       }) 
629 
 
630       var slideCarousel = $.fn.carousel.Constructor.prototype.slide 
631       $.fn.carousel.Constructor.prototype.slide = function (type, next) { 
632         var $element = this.$element 
633           , $active  = $element.find('[role=tabpanel].active') 
634           , $next    = next || $active[type]() 
635           , $tab 
636           , $tab_count = $element.find('[role=tabpanel]').size() 
637           , $prev_side = $element.find('[data-slide="prev"]') 
638           , $next_side = $element.find('[data-slide="next"]') 
639           , $index      = 0 
640           , $prev_index = $tab_count -1 
641           , $next_index = 1 
642           , $id 
643 
 
644         if ($next && $next.attr('id')) { 
645           $id = $next.attr('id') 
646           $index = $id.lastIndexOf("-") 
647           if ($index >= 0) $index = parseInt($id.substring($index+1), 10) 
648 
 
649           $prev_index = $index - 1 
650           if ($prev_index < 1) $prev_index = $tab_count - 1 
651 
 
652           $next_index = $index + 1 
653           if ($next_index >= $tab_count) $next_index = 0 
654         } 
655 
 
656         $prev_side.attr('aria-label', 'Show slide ' + ($prev_index+1) + ' of ' + $tab_count) 
657         $next_side.attr('aria-label', 'Show slide ' + ($next_index+1) + ' of ' + $tab_count) 
658 
 
659 
 
660         slideCarousel.apply(this, arguments) 
661 
 
662       $active 
663         .one('bsTransitionEnd', function () { 
664           var $tab 
665 
 
666           $tab = $element.find('li[aria-controls="' + $active.attr('id') + '"]') 
667           if ($tab) $tab.attr({'aria-selected':false, 'tabIndex': '-1'}) 
668 
 
669           $tab = $element.find('li[aria-controls="' + $next.attr('id') + '"]') 
670           if ($tab) $tab.attr({'aria-selected': true, 'tabIndex': '0'}) 
671 
 
672        }) 
673       } 
674 
 
675      var $this; 
676      $.fn.carousel.Constructor.prototype.keydown = function (e) { 
677 
 
678      $this = $this || $(this) 
679      if(this instanceof Node) $this = $(this) 
680 
 
681      function selectTab(index) { 
682        if (index >= $tabs.length) return 
683        if (index < 0) return 
684 
 
685        $carousel.carousel(index) 
686        setTimeout(function () { 
687             $tabs[index].focus() 
688             // $this.prev().focus() 
689        }, 150) 
690      } 
691 
 
692      var $carousel = $(e.target).closest('.carousel') 
693       , $tabs      = $carousel.find('[role=tab]') 
694       , k = e.which || e.keyCode 
695       , index 
696 
 
697       if (!/(37|38|39|40)/.test(k)) return 
698 
 
699       index = $tabs.index($tabs.filter('.active')) 
700       if (k == 37 || k == 38) {                           //  Up 
701         index-- 
702         selectTab(index); 
703       } 
704 
 
705       if (k == 39 || k == 40) {                          // Down 
706         index++ 
707         selectTab(index); 
708       } 
709 
 
710       e.preventDefault() 
711       e.stopPropagation() 
712     } 
713     $(document).on('keydown.carousel.data-api', 'li[role=tab]', $.fn.carousel.Constructor.prototype.keydown); 
714 
 
715 
 
716  })(jQuery); 
