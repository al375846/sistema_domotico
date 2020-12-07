import {DeviceService} from '../app/devices/device.service';
import {Device} from '../app/devices/device';
import {Room} from '../app/rooms/room';
import {RoomService} from '../app/rooms/room.service';
import {DeviceNotExists} from '../app/devices/exceptions/device-not-exists';
import { obtainDeviceService, obtainRoomService } from './comun';

describe('HU08: Listar dispositivos no asignados conocidos', () => {
    let deviceService: DeviceService;
    let roomService: RoomService;

    beforeEach(() => {
        deviceService = obtainDeviceService();
        
    });

    it('Deberia devolver una lista vacía cuando no hay dispositivos no asignados',
     async () => {
         //Given -- Asignamos todos los dispositivos no asignados para comprobar que la lista de no asignados quede vacia
         roomService = obtainRoomService();

         roomService.addRoom("Test")
         const devices = await deviceService.listUnasignedDevices().toPromise();
         devices.forEach(d=>roomService.asignDevice(d.id,"Test"));
         
         //When -- Obtenemos los dispositivos no asignados
        const listDevices = await deviceService.listUnasignedDevices().toPromise();

         //Then -- No debería de haber ningún dispositivo no asignado
         expect(listDevices.length).toBe(0);

         //After -- Eliminamos la habitación y los dispositivo volverian a estar no asignados
         roomService.deleteRoom("Test");


     });

     it('Deberia devolver una lista no vacia cuando hay algun dispositivo no asignado',
     async () => {
         //Given
         
         //When
         const listDevices = await deviceService.listUnasignedDevices().toPromise();

         //Then
         expect(listDevices.length).toBeGreaterThan(0);
     });
      
});