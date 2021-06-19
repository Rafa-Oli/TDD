import GetParkingLot from "../core/usercase/GetParkingLot";
import ParkingLotRepositoryMemory from "../infra/respository/ParkingLotRepositoryMemory";

export default class ParkingLotController{
    static async getParkingLot(params, body){
        const parkingLotRepositoryMemory = new ParkingLotRepositoryMemory();
        const getParkingLot = new GetParkingLot(parkingLotRepositoryMemory);
        const parkingLot = await getParkingLot.execute(params.code);
        return parkingLot;
    }
}