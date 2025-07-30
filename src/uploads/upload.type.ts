export type TCloudinaryUploadResult = {
    imageUrl: string,
    publicId: string
}

export interface IUploadService{
    uploadImage(buffer: Buffer): Promise<TCloudinaryUploadResult>
}