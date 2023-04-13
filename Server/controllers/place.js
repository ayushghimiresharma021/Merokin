import mongoose from "mongoose";
import jwt from 'jsonwebtoken'
import place from "../models/Place.js";
import { request } from "express";


export const addPlace = async (req, res) => {
    try {
        const { title, address, photo, description, perks, checkIn, checkOut, extraDescription, maxGuests, price } = req.body
        const { token } = req.cookies;
        jwt.verify(token, process.env.SECRET_KEY, {}, async (err, userdata) => {
            if (err) throw err;
            const placeDoc = await place.create({
                owner: userdata.id,
                title,
                address,
                photo,
                description,
                perks,
                checkIn,
                checkOut,
                extraDescription,
                maxGuests,
                price
            })
            res.status(200).json(placeDoc)
        })

    } catch (error) {
        res.status(400).json(error)

    }
}
export const getPlace = async (req, res) => {
    try {
        const { id } = req.params
        const userplace = await place.findById(id)
        res.status(200).json(userplace)
    } catch (error) {
        console.log(error)

    }
}
export const changesInPlace = async (req, res) => {
    try {
        const { id, title, address, photo, description, perks, checkIn, checkOut, extraDescription, maxGuests, price } = req.body
        const { token } = req.cookies

        jwt.verify(token, process.env.SECRET_KEY, {}, async (err, userData) => {
            const placedata = await place.findById(id)
            if (err) throw err

            if (userData.id === placedata.owner.toString()) {
                placedata.set({ title, address, photo, description, perks, checkIn, checkOut, extraDescription, maxGuests, price })
            }
            await placedata.save()
            res.status(200).json(placedata)
        })

    } catch (error) {
        console.log(error)
        res.status(404).json(placedata)
    }
}
export const allPlaces = async (req, res) => {
    try {
        const places = await place.find()
        res.status(200).json(places)
    } catch (error) {
        res.status(404).json(error)
    }

}


