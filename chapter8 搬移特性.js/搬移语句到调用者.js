/*
随着系统能力发生演进（通常只要是有用的系统，功能都会演进），原先设定的抽象边界总会悄无声息地发生偏移。对于函数来说，这样的边界偏移意味着曾经视为一个整体、一个单元的行为，如今可能已经分化出两个甚至是多个不同的关注点。
函数边界发生偏移的一个征兆是，以往在多个地方共用的行为，如今需要在某些调用点面前表现出不同的行为。于是，我们得把表现不同的行为从函数里挪出，并搬移到其调用处

*/

function renderPerson(outStream, person) {
  outStream.write(`<p>${person.name}</p>\n`);
  renderPhoto(outStream, person.photo);
  // emitPhotoData(outStream, person.photo);
  emitPhotoData2(outStream,  person.photo);
  outStream.write(`<p>location: ${person.photo.location}</p>\n`);
 }
 function listRecentPhotos(outStream, photos) {
  photos
   .filter(p => p.date > recentDateCutoff())
   .forEach(p => {
    outStream.write("<div>\n");
    // emitPhotoData(outStream, p);
    emitPhotoData2(outStream,  p);
    utStream.write(`<p>location: ${p.location}</p>\n`);
    outStream.write("</div>\n");
   });
 }
 
//  function emitPhotoData(outStream, photo) {
//   emitPhotoData(outStream, photo);
//   outStream.write(`<p>location: ${photo.location}</p>\n`); // 将此语句搬移到调用者，以按照不同需求进行渲染
//  }
 
 function emitPhotoData2(outStream, photo) {
  outStream.write(`<p>title: ${photo.title}</p>\n`);
  outStream.write(`<p>date: ${photo.date.toDateString()}</p>\n`);
 }