import { defineStore } from 'pinia'
import { Backend } from '../../../common/interface'
import { BackendClient } from './BackendClient'

//const client = BackendClient.instance()

export const useBackendClientStore = defineStore('backend-client', {
  state: () => ({
    client: BackendClient.instance()
  }),
  getters: {
    client: (state) => state.client
  },
  actions: {
    setClient(client: Backend) {
      this.client = client
    }
  }
})
