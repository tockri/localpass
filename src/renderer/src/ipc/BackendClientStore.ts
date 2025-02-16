import { defineStore } from 'pinia'
import { Backend } from '../../../common/interface'
import { BackendClientFactory } from './BackendClient'

const client = BackendClientFactory.create()

export const useBackendClientStore = defineStore('backend-client', {
  state: () => ({
    client
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
