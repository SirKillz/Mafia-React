class BACKENDAPI {
    constructor() {
        this.baseUrl = import.meta.env.VITE_BASE_API_URL
    }

    async _makeGetRequest(endpoint, params = {}) {
  
        const url = `${this.baseUrl}/api/v1${endpoint}?${new URLSearchParams(params)}`;
        const headers = {
          "Content-Type": "application/json",
          "X-API-KEY": import.meta.env.VITE_API_KEY,
        }
  
        return fetch(url, {
          method: "GET",
          headers,
        });
      }

    async _makePostRequest(endpoint, body = {}) {

    const url = `${this.baseUrl}/api/v1${endpoint}`;
    const headers = {
        "Content-Type": "application/json",
        "X-API-KEY": import.meta.env.VITE_API_KEY
    }
    
    return fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
    });
    }

    async getPlayers() {
        const response = await this._makeGetRequest("/players");
        return response.json();
    }

    async createResults(body) {
      return await this._makePostRequest("/games", body);
    }

    async getPlayerStats(playerId) {
      const response = await this._makeGetRequest(`/stats/players/${playerId}`)
      return response.json()
    }

    async getGameStats() {
      const response = await this._makeGetRequest("/stats/teams")
      return response.json()
    }

    async getAveragePlayerStats() {
      const response = await this._makeGetRequest("/stats/players/average")
      return response.json()
    }
}

export default new BACKENDAPI();