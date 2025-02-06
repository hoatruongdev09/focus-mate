type Action = (t: any) => void

export class Observer {
    private event: { [key: string]: Action[] }

    constructor() {
        this.event = {}
    }

    register(key: string, action: Action) {
        if (!this.event[key]) {
            this.event[key] = []
        }
        this.event[key].push(action)
    }

    remove(key: string, action: Action) {
        if (!this.event[key]) {
            return
        }
        this.event[key] = this.event[key].filter(a => a != action)
    }

    publish<T>(key: string, t: T) {
        if (!this.event[key]) {
            return
        }
        for (let action of this.event[key]) {
            action(t)
        }
    }
}

export const defaultObserver: Observer = new Observer()