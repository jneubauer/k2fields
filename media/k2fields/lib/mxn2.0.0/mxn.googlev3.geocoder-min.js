/*
MAPSTRACTION   v2.0.0   http://www.mapstraction.com

The BSD 3-Clause License (http://www.opensource.org/licenses/BSD-3-Clause)

Copyright (c) 2012 Tom Carden, Steve Coast, Mikel Maron, Andrew Turner, Henri Bergius, Rob Moran, Derek Fowler, Gary Gale
All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

 * Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
 * Neither the name of the Mapstraction nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
mxn.register("googlev3",{Geocoder:{init:function(){this.geocoders[this.api]=new google.maps.Geocoder()},geocode:function(b){var a=this;var c={};if(typeof(b)=="object"){if(b.hasOwnProperty("lat")&&b.hasOwnProperty("lon")){c.latLng=b.toProprietary(this.api)}else{c.address=[b.street,b.locality,b.region,b.country].join(", ")}}else{c.address=b}this.geocoders[this.api].geocode(c,function(e,d){a.geocode_callback(e,d)})},geocode_callback:function(f,e){var k={};if(e!=google.maps.GeocoderStatus.OK){this.error_callback(e)}else{k.street="";k.locality="";k.postcode="";k.region="";k.country="";var c=f[0];var h=[];for(var g=0;g<c.address_components.length;g++){var b=c.address_components[g];for(var d=0;d<b.types.length;d++){var a=b.types[d];switch(a){case"country":k.country=b.long_name;break;case"administrative_area_level_1":k.region=b.long_name;break;case"locality":k.locality=b.long_name;break;case"street_address":k.street=b.long_name;break;case"postal_code":k.postcode=b.long_name;break;case"street_number":h.unshift(b.long_name);break;case"route":h.push(b.long_name);break}}}if(k.street===""&&h.length>0){k.street=h.join(" ")}k.point=new mxn.LatLonPoint(c.geometry.location.lat(),c.geometry.location.lng());this.callback(k)}}}});