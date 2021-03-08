import { Request, Response } from "express";

export default interface IRequestResponseDTO {
  req: Request
  res: Response
}
