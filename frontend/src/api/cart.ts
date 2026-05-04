export async function addToCartAPI() {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return { success: true };
}