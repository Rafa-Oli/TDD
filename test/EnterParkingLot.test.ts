import ParkingLotRepositoryMemory from "../src/infra/respository/ParkingLotRepositoryMemory";
import EnterParkingLot from "../src/core/usercase/EnterParkingLot";
import GetParkingLot from "../src/core/usercase/GetParkingLot";
import ParkingLotRepositorySQL from "../src/infra/respository/ParkingLotRepositorySQL";

test.skip('Should enter parking lot', async function() {
    const parkingRepositoryMemory = new ParkingLotRepositoryMemory();
    const parkingRepositorySQL = new ParkingLotRepositorySQL();
    const enterParkingLot = new EnterParkingLot(parkingRepositoryMemory);
    const getParkingLot = new GetParkingLot(parkingRepositoryMemory);
    const parkingLotBeforeEnter = await getParkingLot.execute('shopping');
    expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0);
    await enterParkingLot.execute("shopping", "MMM-0001", new Date("2021-03-01T10:00:00"));
    const parkingLotAfterEnter = await getParkingLot.execute('shopping');
    expect(parkingLotAfterEnter.occupiedSpaces).toBe(1);
});

test.skip('Should get parking lot', async function() {
    const parkingRepositoryMemory = new ParkingLotRepositoryMemory();
    const parkingRepositorySQL = new ParkingLotRepositorySQL();
    const getParkingLot = new GetParkingLot(parkingRepositorySQL );

    const parkingLot = await getParkingLot.execute('execute');
    expect(parkingLot.code).toBe('shopping')
})
test.skip('Should be closed', async function() {
    const parkingRepositoryMemory = new ParkingLotRepositoryMemory();
    const parkingRepositorySQL = new ParkingLotRepositorySQL();
    const enterParkingLot = new EnterParkingLot(parkingRepositoryMemory);
    const getParkingLot = new GetParkingLot(parkingRepositoryMemory);
    const parkingLotBeforeEnter = await getParkingLot.execute('shopping');
    expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0);
    await enterParkingLot.execute("shopping", "MMM-0001", new Date("2021-03-01T23:00:00"));
})

test.skip('Should be full', async function() {
    const parkingRepositoryMemory = new ParkingLotRepositoryMemory();
    const enterParkingLot = new EnterParkingLot(parkingRepositoryMemory);
    const getParkingLot = new GetParkingLot(parkingRepositoryMemory);
    const parkingLotBeforeEnter = await getParkingLot.execute('shopping');
    expect(parkingLotBeforeEnter.occupiedSpaces).toBe(0);
    await enterParkingLot.execute("shopping", "MMM-0001", new Date("2021-03-01T10:00:00"));
    await enterParkingLot.execute("shopping", "MMM-0002", new Date("2021-03-01T10:00:00"));
    await enterParkingLot.execute("shopping", "MMM-0003", new Date("2021-03-01T10:00:00"));
    await enterParkingLot.execute("shopping", "MMM-0004", new Date("2021-03-01T10:00:00"));
    await enterParkingLot.execute("shopping", "MMM-0005", new Date("2021-03-01T10:00:00"));
    await enterParkingLot.execute("shopping", "MMM-0006", new Date("2021-03-01T10:00:00"));
    await enterParkingLot.execute("shopping", "MMM-0007", new Date("2021-03-01T10:00:00"));
})