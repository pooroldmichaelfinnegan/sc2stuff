import numpy as np, pyperclip, pickle#, lzma
# from s2clientprotocol import sc2api_pb2
with open("./abys/AbyssalReefLE", "rb") as f:
    # raw_game_data, raw_game_info, raw_observation = pickle.load(f)
    gd, gi, o = pickle.load(f)


'''

execute(gi = api.RequestGameInfo())
    response
    __request(api.Request())
        response = api.Responce()
+ GameInfo

        api.Response().ParseFromString(_received_bytes())
    api.Request()
api.RequestGameInfo()

'''


# plg = gi.game_info.start_raw.placement_grid.data
plg = gi.game_info.start_raw.terrain_height.data
plga = np.frombuffer(plg, dtype=np.uint8)
# plgb = np.unpackbits(plga)

a = []
for b in plga:
    a += [b]

pyperclip.copy(repr(a))
print(a)