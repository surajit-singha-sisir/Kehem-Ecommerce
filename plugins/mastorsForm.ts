// plugins/mastorsForm.ts
type MastorsFormAPI = {
  get(url: string, params?: Record<string, string | number>): Promise<any>;
  post(url: string, data?: object): Promise<any>;
};

export default defineNuxtPlugin(nuxtApp => {
  // Define the mastorsForm object and make it available globally
  const mastorsForm: MastorsFormAPI = {
    async get(url: string, params: Record<string, string | number> = {}): Promise<any> {
      try {
        const response = await $fetch(url, {
          method: 'GET',
          params: params,
        });
        return response;
      } catch (error) {
        console.error("API Request Failed:", error);
        throw new Error("Failed to fetch data");
      }
    },

    async post(url: string, data: object = {}): Promise<any> {
      try {
        const response = await $fetch(url, {
          method: 'POST',
          body: JSON.stringify(data),
        });
        return response;
      } catch (error) {
        console.error("API Request Failed:", error);
        throw new Error("Failed to send data");
      }
    }
  };

  // Provide the mastorsForm globally
  nuxtApp.provide('mastorsForm', mastorsForm);
});
