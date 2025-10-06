import prisma from "../utils/prisma.js";
import bcrypt from "bcrypt";



export const getHunsurjaData = async(req, res)=>{
    try {

        if(req.user.role !== "ADMIN"){
            return res.status(403).json({message: "Forbidden - Admins only can get employee data"})
        }

        const hunsurja = await prisma.hansUrja.findMany({
            where: {
                role:"HANSURJAMITRA"
            }
        })

        if(!hunsurja){
            return res.status(404).json({message: "Hunsurja not found"})
        }

        return res.status(200).json({
            message: "Hunsurja data fetched successfully",
            hunsurja
        })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const getHunsurjaById = async(req, res)=>{

    try {

        const {id} = req.params

        const hunsurja = await prisma.hansUrja.findUnique({
            where: {
                id
            }
        })

        if(!hunsurja){
            return res.status(404).json({message: "Hunsurja not found"})
        }

        return res.status(200).json({
            message: "Hunsurja data By Id  fetched successfully",
            hunsurja
        })        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error"})
    }


}

export const updateHunsurjaData = async(req, res)=>{
    try {

        const {id} = req.params

        const hunsurjaUpdate = await prisma.hansUrja.findUnique({
            where: {
                id
            }
        })

        if(!hunsurjaUpdate){
            return res.status(404).json({message: "Hunsurja not found"})
        }

    const {
        name,
        email,
        password,
        phoneNumber,
        whatsappNumber,
        address,
        birthday,
        state,
        district,
        tehsil,
        village,
        infoSource,
        notes,
        followUp,
        workCategory,
        startDate,
        aadhaarNumber,
        panNumber,  
    } = req.body

    const LowerCaseName = name?.toLowerCase();
    const hashPassword = password ? await bcrypt.hash(password, 10) : undefined;

    const updatedHunsurjaData = {
        ...(name && { name: LowerCaseName }),
        ...(email !== undefined && { email }),
        ...(password && { password: hashPassword }),
        ...(phoneNumber !== undefined && { phoneNumber }),
        ...(whatsappNumber !== undefined && { whatsappNumber }),
        ...(address !== undefined && { address }),
        ...(birthday !== undefined && { birthday }),
        ...(state !== undefined && { state }),
        ...(district !== undefined && { district }),
        ...(tehsil !== undefined && { tehsil }),
        ...(village !== undefined && { village }),
        ...(infoSource !== undefined && { infoSource }),
        ...(notes !== undefined && { notes }),
        ...(followUp !== undefined && { followUp }),
        ...(workCategory !== undefined && { workCategory }),
        ...(startDate !== undefined && { startDate }),
        ...(aadhaarNumber !== undefined && { aadhaarNumber }),
        ...(panNumber !== undefined && { panNumber })
    }

    const updatedHunsurja = await prisma.hansUrja.update({
        where: {
            id
        },
        data: updatedHunsurjaData
    })

    return res.status(200).json({
        message: "Hunsurja data updated successfully",
        hunsurja: updatedHunsurja
    })
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}

export const deleteHunsurjaData = async(req, res)=>{
    try {
        const {id} = req.params

        const hunsurjaDelete = await prisma.hansUrja.findUnique({
            where: {
                id
            }
        })

        if(!hunsurjaDelete){
            return res.status(404).json({message: "Hunsurja not found"})
        }

        const deletedHunsurja = await prisma.hansUrja.delete({
            where: {
                id
            }
        })

        return res.status(200).json({
            message: "Hunsurja data deleted successfully",
            hunsurja: deletedHunsurja
        })
            
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}
