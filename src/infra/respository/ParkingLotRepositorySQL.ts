import ParkingLotAdapter from "../../adapter/ParkingLotAdapter";
import ParkingLot from "../../core/entity/ParkingLot";
import ParkingLotRepository from "../../core/repository/ParkingLotRepository";
import database from '../database/database';

 
 export default class ParkingLotRepositorySQL implements ParkingLotRepository{
     async getParkingLot(code: string): Promise<ParkingLot> {
         const parkingLot = await database.oneOrNone("select *, (select count(*) from example.parked_car pc where pc.code = pl.code ) as occupied_spaces from example.parking_lot pl where pl.code = $1", [code])
         
         return ParkingLotAdapter.create(parkingLot.code, parkingLot.capacity,parkingLot.openHour, parkingLot.closeHour, parkingLot.occupied_spaces)
        }
    async saveParkedCar(code: string, plate: string, date: Date): Promise<void> {
        await database.none('insert int example.parked_car(code, plate, date) values($1, $2, $3)', [code, plate,date])
     }
     
 }