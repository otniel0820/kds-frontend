import { Order } from "@/dtos/Order.dto"

export type Rider = {
	orderWanted: string
	pickup: (order?: Order) => void
}
