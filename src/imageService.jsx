export const fetchImageDescription = async (imageFile) => {
                              const formData = new FormData();
                              formData.append("image", imageFile);
                            
                              // Burada görseli işleyebilecek API'nin URL'sini kullanıyoruz.
                              const response = await fetch("YOUR_IMAGE_API_ENDPOINT", {
                                method: "POST",
                                body: formData,
                              });
                            
                              const result = await response.json();
                              return result.description; // API'nin geri döndüğü açıklama (description)
                            };
                            