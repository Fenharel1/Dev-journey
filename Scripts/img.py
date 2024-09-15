from PIL import ImageGrab

# Capturar la imagen desde el clipboard
image = ImageGrab.grabclipboard()

image.save("clipboard_image.png", "PNG")