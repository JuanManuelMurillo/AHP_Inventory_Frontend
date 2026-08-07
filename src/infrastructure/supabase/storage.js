import supabase from "./supabase";

export async function uploadImage(file, fileName) {

    const extension = file.name.split(".").pop();

    const fullName = `${fileName}.${extension}`;

    const { error } = await supabase.storage
        .from("printer_images")
        .upload(fullName, file, {
            upsert: true,
        });

    if (error) {
        console.error(JSON.stringify(error, null, 2));
        throw error;
    }

    const {
        data: { publicUrl },
    } = supabase.storage
        .from("printer_images")
        .getPublicUrl(fullName);

    return {
        imageUrl: fullName,
        publicUrl,
    };
}

export function getPrinterImage(imageName) {
    if(!imageName) {
        return "/img/printer_icon.png";
    }

    const {
        data: { publicUrl },
    } = supabase.storage
        .from("printer_images")
        .getPublicUrl(imageName);

    return publicUrl;
}