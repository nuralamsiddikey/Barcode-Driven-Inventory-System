
class BaseRepository {
  #model;
  constructor(model) {
    this.#model = model;
  }

  async create(item) {

  }

}

export default BaseRepository;
