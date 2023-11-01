function displayFPS(currentFPS) {
  fill(255); // White background
  noStroke();
  let padding = 4; // Padding around the text

  let fpsText = "Current FPS: " + parseInt(currentFPS);
  let avgText = "Average FPS: " + parseInt(averageFPS);

  let maxWidth = Math.max(textWidth(fpsText), textWidth(avgText)) + padding * 2;

  textSize(12); // Adjust text size as needed
  let textHeight = textSize() + padding;

  rect(0, 0, maxWidth, textHeight * 2 + padding * 2); // Draw the rectangle with the corrected width

  fill(0); // Text color (black)
  text(fpsText, padding, textSize() + padding); // Draw the text
  text(avgText, padding, textSize() * 2 + padding * 2);
}
