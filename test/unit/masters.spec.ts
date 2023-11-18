import { ApiClientUtils } from 'fwork.common.typescript/apiClient'
import { IChild, IMaster } from 'projecttemplate.lib.common.ts/models'
import axios from 'axios'
// import { StartExpressApi, StopExpressApi } from '../..'

jest.setTimeout(1000 * 60)
const APIURL_BASE = 'http://localhost:8080'
const APIURL_MASTERS = APIURL_BASE + '/masters'
const APIURL_CHILDREN = APIURL_BASE + '/children'

describe('masters', () => {
  beforeAll(async () => {
    // StartExpressApi()
  })

  it('Should executes CRUD operations', async () => {
    console.log('MASTERS CRUD')

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
    const responseCreated = await ApiClientUtils.post<IMaster>(axios, APIURL_MASTERS, {
      SOMEFIELD: 'MASTER 3 FROM API',
      CHILDRENSUBDOC: [{
        SOMEFIELD: 'SUBDOC 1 MASTER 3 FROM API'
      }],
      CHILDREN: [{
        SOMEFIELD: 'CHILD 1 MASTER 3 FROM API'
      }, {
        SOMEFIELD: 'CHILD 2 MASTER 3 FROM API'
      }]
    })
    console.log(`masters.created: ${JSON.stringify(responseCreated, null, 4)}`)
    await expect(responseCreated.data?._id).toBeDefined()

    // CREATE CHILDREN
    const responseChildCreated = await ApiClientUtils.post<IChild>(axios, APIURL_CHILDREN, {
      SOMEFIELD: 'CHILD 3 MASTER 3 FROM API',
      MASTERID: responseCreated?.data?._id
    })
    console.log(`masters.childcreated: ${JSON.stringify(responseChildCreated, null, 4)}`)
    await expect(responseChildCreated.data?._id).toBeDefined()

    // READ
    const responseReaded = await ApiClientUtils.get<IMaster, any>({
      axios,
      apiUrl: APIURL_MASTERS,
      where: {
        _id: responseCreated.data?._id
      }
    })
    console.log(`masters.readed: ${JSON.stringify(responseReaded, null, 4)}`)
    await expect(responseReaded.data?.payload?.length).toBeGreaterThan(0)

    if (responseReaded.data?.payload?.length) {
      // UPDATE
      responseReaded.data.payload[0].SOMEFIELD += ' UPDATED'
      const responseUpdated = await ApiClientUtils.put<IMaster>(axios, APIURL_MASTERS, responseReaded.data.payload[0])
      console.log(`masters.updated: ${JSON.stringify(responseUpdated, null, 4)}`)
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
