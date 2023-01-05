import { Request, Response } from 'express'
import { EventType, TypedRequest } from '../interfaces';
import {Event} from '../models/eventModel';

const getEvents =  async (req: TypedRequest, res: Response) => {
    const events = await Event.find().populate('user', 'name');
    res.json({
        ok: true,
        events
    });
};

const createEvenet =  async (req: TypedRequest<EventType>, res: Response) => {
    const {_id} = req;
    console.log(req.body)

    const newEvent = new Event(req.body);
    newEvent.user = _id!;

    try {
        await newEvent.save();
        res.json({
            ok: true,
            event: newEvent
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    };
    
};

const updateEvent =  async (req: TypedRequest<EventType, {id: string}>, res: Response) => {
    const {id} = req.params;
    const {_id} = req;

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe'
            });
        };

        if (event!.user.toString() !== _id!.toString()) {
            return res.status(401).json({
                ok: false,
                msg: 'No tienes privilegio para editar este evento'
            });
        };

        const newEvent = {
            ...req.body,
            user: _id
        };

        const updatedEvent = await Event.findByIdAndUpdate(id, newEvent, {new: true});
        res.json({
            ok: true,
            event: updatedEvent
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
    
};

const deleteEvent =  async (req: TypedRequest<{}, {id: string}>, res: Response) => {
    const {id} = req.params;
    const {_id} = req;

    try {
        const event = await Event.findById(id);

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe'
            });
        };

        if (event!.user.toString() !== _id!.toString()) {
            return res.status(401).json({
                ok: false,
                msg: 'No tienes privilegio para editar este evento'
            });
        };

        await Event.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Evento eliminado',
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    };
};


export {
    getEvents,
    createEvenet,
    updateEvent,
    deleteEvent
}





