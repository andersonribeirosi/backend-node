import { ApiClientUtils } from 'fwork.common.typescript/apiClient'
import { IChild, IMaster } from 'projecttemplate.lib.common.ts/models'
import axios from 'axios'
// import { StartExpressApi, StopExpressApi } from '../..'

jest.setTimeout(1000 * 60)
const APIURL_BASE = 'http://localhost:8080'
const APIURL_MASTERS = APIURL_BASE + '/masters'
const APIURL_CHILDREN = APIURL_BASE + '/children'

describe('children', () => {
  beforeAll(async () => {
    // StartExpressApi()
  })

  it('Should executes CRUD operations', async () => {
    console.log('CHILDREN CRUD')

    // BULKCREATE
    // const responseCreatedList = await ApiClientUtils.bulkCreate([{
    //   SOMEFIELD: 'MASTER BULK 1 FROM API',
    //   CHILDRENSUBDOC: [{
    //     SOMEFIELD: 'SUBDOC 1 MASTER BULK 1 FROM API'
    //   }],
    //   CHILDREN: [{
    //     SOMEFIELD: 'CHILD 1 MASTER BULK 1 FROM API'
    //   }, {
    //     SOMEFIELD: 'CHILD 2 MASTER BULK 1 FROM API'
    //   }]
    // }, {
    //   SOMEFIELD: 'MASTER BULK 2 FROM API',
    //   CHILDRENSUBDOC: [{
    //     SOMEFIELD: 'SUBDOC 1 MASTER BULK 2 FROM API'
    //   }],
    //   CHILDREN: [{
    //     SOMEFIELD: 'CHILD 1 MASTER BULK 2 FROM API'
    //   }, {
    //     SOMEFIELD: 'CHILD 2 MASTER BULK 2 FROM API'
    //   }]
    // }])
    // await expect(responseCreatedList?.length).toBeGreaterThan(0)
    // console.log(`masters.createdList: ${JSON.stringify(responseCreatedList, null, 4)}`)

    // CREATE
    const responseMasterCreated = await ApiClientUtils.post<IMaster>(axios, APIURL_MASTERS, {
      SOMEFIELD: 'MASTER 4 FROM API',
    })
    console.log(`children.masterCreated: ${JSON.stringify(responseMasterCreated, null, 4)}`)
    await expect(responseMasterCreated.data?._id).toBeDefined()

    // CREATE CHILDREN
    const responseCreated = await ApiClientUtils.post<IChild>(axios, APIURL_CHILDREN, {
      SOMEFIELD: 'CHILD 1 MASTER 4 FROM API',
      MASTERID: responseMasterCreated?.data?._id
    })
    console.log(`children.created: ${JSON.stringify(responseCreated, null, 4)}`)
    await expect(responseCreated.data?._id).toBeDefined()

    // READ
    const responseReaded = await ApiClientUtils.get<IChild, any>({
      axios,
      apiUrl: APIURL_CHILDREN,
      where: {
        _id: responseCreated.data?._id
      }
    })
    console.log(`children.readed: ${JSON.stringify(responseReaded, null, 4)}`)
    await expect(responseReaded.data?.payload?.length).toBeGreaterThan(0)

    if (responseReaded.data?.payload?.length) {
      // UPDATE
      responseReaded.data.payload[0].SOMEFIELD += ' UPDATED'
      const responseUpdated = await ApiClientUtils.put<IChild>(axios, APIURL_CHILDREN, responseReaded.data.payload[0])
      console.log(`children.updated: ${JSON.stringify(responseUpdated, null, 4)}`)
      await expect(responseUpdated.data?.SOMEFIELD).toContain('UPDATED')

      // DELETE
      // const responseDeleted = await ApiClientUtils.delete<number>(axios, APIURL, responseCreated.data?._id)
      // await expect(responseDeleted.data).toBe(true)

      // const ids = responseCreatedList?.map(m => m._id)
      // const responseDeletedList = await new MastersDataSource().delete({
      //   _id: {
      //     $in: ids
      //   }
      // })
      // await expect(responseDeletedList).toBeGreaterThan(0)
    }
  })

  afterAll(async () => {
    // StopExpressApi()
  })
})
